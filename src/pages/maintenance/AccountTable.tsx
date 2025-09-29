import React from 'react';

const AccountTable = () => {
  return (
    <div className="maintenance-table">
      <header className="maintenance-table__header">
        <div>
          <h2>會計科目管理</h2>
          <p>暫無會計科目，請新增科目</p>
        </div>
        <div className="maintenance-table__actions">
          <button type="button" className="maintenance-table__button maintenance-table__button--primary">
            ＋ 新增科目
          </button>
          <button type="button" className="maintenance-table__button maintenance-table__button--upload">
            📁 上傳會計科目表
          </button>
        </div>
      </header>

      <table className="maintenance-table__table">
        <thead>
          <tr>
            <th>對應表單</th>
            <th>會計科目</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3} className="maintenance-table__empty">
              暫無會計科目，請新增科目
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;
