import React, { useEffect, useState } from 'react';
import { getTrialBalance, TrialBalanceEntry } from '../api';

const TrialBalance = () => {
  const [data, setData] = useState<TrialBalanceEntry[]>([]);
  const [error, setError] = useState('');
  const [totals, setTotals] = useState({ debit: 0, credit: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTrialBalance();
        setData(response.data);
        
        // Calculate totals
        const totalDebit = response.data.reduce((sum, item) => sum + item.total_debit, 0);
        const totalCredit = response.data.reduce((sum, item) => sum + item.total_credit, 0);
        setTotals({ debit: totalDebit, credit: totalCredit });

      } catch (err) {
        setError('Failed to fetch trial balance.');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>試算表 (Trial Balance)</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>會計科目</th>
            <th className="text-end">借方 (Debit)</th>
            <th className="text-end">貸方 (Credit)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.account_name}>
              <td>{entry.account_name}</td>
              <td className="text-end">{entry.total_debit.toFixed(2)}</td>
              <td className="text-end">{entry.total_credit.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="table-group-divider">
          <tr className="fw-bold">
            <td>總計</td>
            <td className="text-end">{totals.debit.toFixed(2)}</td>
            <td className="text-end">{totals.credit.toFixed(2)}</td>
          </tr>
          {Math.abs(totals.debit - totals.credit) > 0.001 && (
            <tr>
                <td colSpan={3} className="text-center text-danger fw-bold">
                    借貸不平衡！
                </td>
            </tr>
          )}
        </tfoot>
      </table>
    </div>
  );
};

export default TrialBalance;
