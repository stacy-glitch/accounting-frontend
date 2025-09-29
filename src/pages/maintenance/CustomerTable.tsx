import React from 'react';

const CustomerTable = () => {
  return (
    <div className="maintenance-table">
      <header className="maintenance-table__header">
        <div>
          <h2>客戶資料管理</h2>
          <p>暫無客戶資料，請新增客戶</p>
        </div>
        <div className="maintenance-table__actions">
          <button type="button" className="maintenance-table__button maintenance-table__button--primary">
            ＋ 新增客戶
          </button>
          <button type="button" className="maintenance-table__button maintenance-table__button--danger">
            清除所有資料
          </button>
          <button type="button" className="maintenance-table__button maintenance-table__button--upload">
            📁 上傳代號表
          </button>
        </div>
      </header>

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
          <tr>
            <td colSpan={6} className="maintenance-table__empty">
              暫無客戶資料，請新增客戶
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
