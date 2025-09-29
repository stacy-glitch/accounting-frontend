import React, { useRef, useState } from 'react';

import { useMasterData } from '../../context/MasterDataContext';

const CustomerTable = () => {
  const { customers, importCustomers } = useMasterData();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setError('');
      await importCustomers(file);
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
          <h2>客戶資料管理</h2>
          <p>{customers.length === 0 ? '暫無客戶資料，請新增或上傳代號表' : `共 ${customers.length} 筆客戶資料`}</p>
        </div>
        <div className="maintenance-table__actions">
          <button type="button" className="maintenance-table__button maintenance-table__button--primary">
            ＋ 新增客戶
          </button>
          <button
            type="button"
            className="maintenance-table__button maintenance-table__button--upload"
            onClick={handleUploadClick}
          >
            📁 上傳代號表
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
            <th>代號</th>
            <th>客戶名稱</th>
            <th>統一編號</th>
            <th>聯絡人</th>
            <th>電話</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.code}>
                <td>{customer.code}</td>
                <td>{customer.name}</td>
                <td>{customer.taxId}</td>
                <td>{customer.contact}</td>
                <td>{customer.phone}</td>
                <td>
                  <button type="button" className="maintenance-table__linkButton">
                    編輯
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="maintenance-table__empty">
                暫無客戶資料，請新增或上傳代號表
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
