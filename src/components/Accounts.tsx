import React, { useEffect, useState } from 'react';
import { getAccounts, createAccount, Account } from '../api';

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountCategory, setNewAccountCategory] = useState('Asset');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await getAccounts();
      setAccounts(response.data);
    } catch (err) {
      setError('Failed to fetch accounts.');
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountName || !newAccountCategory) {
        setError('Name and category are required.');
        return;
    }
    try {
      await createAccount({ name: newAccountName, category: newAccountCategory });
      setNewAccountName('');
      setNewAccountCategory('Asset');
      fetchAccounts(); // Refresh the list
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create account.');
    }
  };

  return (
    <div>
      <h2>會計科目 (Chart of Accounts)</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleCreateAccount} className="mb-4 p-3 border rounded">
        <div className="row g-3 align-items-end">
          <div className="col-md-5">
            <label htmlFor="accountName" className="form-label">科目名稱</label>
            <input
              id="accountName"
              type="text"
              className="form-control"
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
              placeholder="例如：銀行存款"
            />
          </div>
          <div className="col-md-5">
            <label htmlFor="accountCategory" className="form-label">類別</label>
            <select
              id="accountCategory"
              className="form-select"
              value={newAccountCategory}
              onChange={(e) => setNewAccountCategory(e.target.value)}
            >
              <option value="Asset">資產 (Asset)</option>
              <option value="Liability">負債 (Liability)</option>
              <option value="Equity">權益 (Equity)</option>
              <option value="Income">收入 (Income)</option>
              <option value="Expense">支出 (Expense)</option>
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">新增</button>
          </div>
        </div>
      </form>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>名稱</th>
            <th>類別</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.name}</td>
              <td>{account.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accounts;
