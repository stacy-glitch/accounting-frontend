import React, { useRef, useState } from 'react';

import { useMasterData } from '../../context/MasterDataContext';

const AccountTable = () => {
  const { accounts, importAccounts } = useMasterData();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setError('');
      await importAccounts(file);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      event.target.value = '';
    }
  };

  return (
    <div className="maintenance-table">
      <header className="maintenance-table__header">
        <div>
          <h2>會計科目管理</h2>
          <p>{accounts.length === 0 ? '暫無會計科目，請新增或上傳會計科目表' : `共 ${accounts.length} 個會計科目`}</p>
        </div>
        <div className="maintenance-table__actions">
          <button type="button" className="maintenance-table__button maintenance-table__button--primary">
            ＋ 新增科目
          </button>
          <button
            type="button"
            className="maintenance-table__button maintenance-table__button--upload"
            onClick={handleUploadClick}
          >
            📁 上傳會計科目表
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="visually-hidden"
            onChange={handleFileChange}
          />
        </div>
      </header>

      {error && <p className="maintenance-table__error">{error}</p>}

      <table className="maintenance-table__table">
        <thead>
          <tr>
            <th>對應表單</th>
            <th>會計科目</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <tr key={`${account.mapping}-${account.name}`}>
                <td>{account.mapping}</td>
                <td>{account.name}</td>
                <td>
                  <button type="button" className="maintenance-table__linkButton">
                    編輯
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="maintenance-table__empty">
                暫無會計科目，請新增或上傳會計科目表
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;
