import React from 'react';

const EmployeeTable = () => {
  return (
    <div className="maintenance-table">
      <header className="maintenance-table__header">
        <div>
          <h2>員工資料管理</h2>
          <p>暫無員工資料，請新增員工</p>
        </div>
        <div className="maintenance-table__actions">
          <button type="button" className="maintenance-table__button maintenance-table__button--primary">
            ＋ 新增員工
          </button>
          <button type="button" className="maintenance-table__button maintenance-table__button--upload">
            📁 上傳員工表
          </button>
        </div>
      </header>

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
          <tr>
            <td colSpan={4} className="maintenance-table__empty">
              暫無員工資料，請新增員工
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
