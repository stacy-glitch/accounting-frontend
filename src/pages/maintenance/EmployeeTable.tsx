import React, { useRef, useState } from 'react';

import { useMasterData } from '../../context/MasterDataContext';

const EmployeeTable = () => {
  const { employees, importEmployees } = useMasterData();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setError('');
      await importEmployees(file);
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
          <h2>員工資料管理</h2>
          <p>{employees.length === 0 ? '暫無員工資料，請新增或上傳員工表' : `共 ${employees.length} 位員工`}</p>
        </div>
        <div className="maintenance-table__actions">
          <button type="button" className="maintenance-table__button maintenance-table__button--primary">
            ＋ 新增員工
          </button>
          <button
            type="button"
            className="maintenance-table__button maintenance-table__button--upload"
            onClick={handleUploadClick}
          >
            📁 上傳員工表
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
            <th>員工姓名</th>
            <th>電話</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.code}>
                <td>{employee.code}</td>
                <td>{employee.name}</td>
                <td>{employee.phone}</td>
                <td>
                  <button type="button" className="maintenance-table__linkButton">
                    編輯
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="maintenance-table__empty">
                暫無員工資料，請新增或上傳員工表
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
