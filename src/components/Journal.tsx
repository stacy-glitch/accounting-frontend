import React, { useEffect, useState } from 'react';
import { getAccounts, getJournalEntries, createJournalEntry, Account, JournalEntry, JournalEntryPayload } from '../api';

const Journal = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
    const [description, setDescription] = useState('');
    const [entries, setEntries] = useState([{ account_id: '', amount: '', type: 'debit' }]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const [accRes, jrnRes] = await Promise.all([getAccounts(), getJournalEntries()]);
            setAccounts(accRes.data);
            setJournalEntries(jrnRes.data);
        } catch (err) {
            setError('Failed to fetch initial data.');
        }
    };

    const handleAddEntry = () => {
        setEntries([...entries, { account_id: '', amount: '', type: 'credit' }]);
    };

    type EntryField = 'account_id' | 'amount' | 'type';

    const handleEntryChange = (index: number, field: EntryField, value: string) => {
        const newEntries = [...entries];
        newEntries[index][field] = value;
        setEntries(newEntries);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const payloadEntries = entries.map(entry => ({
            account_id: parseInt(entry.account_id),
            debit: entry.type === 'debit' ? parseFloat(entry.amount) : 0,
            credit: entry.type === 'credit' ? parseFloat(entry.amount) : 0,
        }));

        const totalDebit = payloadEntries.reduce((sum, e) => sum + e.debit, 0);
        const totalCredit = payloadEntries.reduce((sum, e) => sum + e.credit, 0);

        if (Math.abs(totalDebit - totalCredit) > 0.001) { // Use a small tolerance for float comparison
            setError('借貸金額必須相等 (Debits must equal credits).');
            return;
        }

        const payload: JournalEntryPayload = {
            description,
            entries: payloadEntries,
        };

        try {
            await createJournalEntry(payload);
            // Reset form
            setDescription('');
            setEntries([{ account_id: '', amount: '', type: 'debit' }]);
            // Refetch journal entries
            fetchInitialData();
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to create journal entry.');
        }
    };

    return (
        <div>
            <h2>分錄 (Journal)</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded">
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">描述</label>
                    <input
                        id="description"
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="交易描述"
                        required
                    />
                </div>

                {entries.map((entry, index) => (
                    <div key={index} className="row g-3 mb-2 align-items-center">
                        <div className="col-md-5">
                            <select
                                className="form-select"
                                value={entry.account_id}
                                onChange={e => handleEntryChange(index, 'account_id', e.target.value)}
                                required
                            >
                                <option value="">選擇會計科目</option>
                                {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name}</option>)}                            </select>
                        </div>
                        <div className="col-md-3">
                            <input
                                type="number"
                                className="form-control"
                                value={entry.amount}
                                onChange={e => handleEntryChange(index, 'amount', e.target.value)}
                                placeholder="金額"
                                required
                                step="0.01"
                            />
                        </div>
                        <div className="col-md-3">
                            <select
                                className="form-select"
                                value={entry.type}
                                onChange={e => handleEntryChange(index, 'type', e.target.value)}
                            >
                                <option value="debit">借方 (Debit)</option>
                                <option value="credit">貸方 (Credit)</option>
                            </select>
                        </div>
                    </div>
                ))}

                <button type="button" className="btn btn-secondary me-2" onClick={handleAddEntry}>
                    新增分錄項
                </button>
                <button type="submit" className="btn btn-primary">
                    建立分錄
                </button>
            </form>
            
            <h3>歷史分錄</h3>
            <table className="table table-sm table-striped">
                <thead className="table-light">
                    <tr>
                        <th>交易ID</th>
                        <th>科目</th>
                        <th>描述</th>
                        <th className="text-end">借方</th>
                        <th className="text-end">貸方</th>
                    </tr>
                </thead>
                <tbody>
                    {journalEntries.map(entry => (
                        <tr key={entry.id}>
                            <td>{entry.transaction_id}</td>
                            <td>{entry.account.name}</td>
                            <td>{entry.description}</td>
                            <td className="text-end text-success">{entry.debit > 0 ? entry.debit.toFixed(2) : ''}</td>
                            <td className="text-end text-danger">{entry.credit > 0 ? entry.credit.toFixed(2) : ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Journal;
