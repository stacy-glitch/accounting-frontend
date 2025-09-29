import React from 'react';

const VehicleTable = () => {
  return (
    <div className="maintenance-table">
      <header className="maintenance-table__header">
        <div>
          <h2>車輛資料管理</h2>
          <p>暫無車輛資料，請新增車輛</p>
        </div>
        <div className="maintenance-table__actions">
          <button type="button" className="maintenance-table__button maintenance-table__button--primary">
            ＋ 新增車輛
          </button>
          <button type="button" className="maintenance-table__button maintenance-table__button--upload">
            📁 上傳車輛表
          </button>
        </div>
      </header>

      <table className="maintenance-table__table">
        <thead>
          <tr>
            <th>代號</th>
            <th>車牌號碼</th>
            <th>車型</th>
            <th>廠牌</th>
            <th>司機</th>
            <th>行照</th>
            <th>駕照</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={8} className="maintenance-table__empty">
              暫無車輛資料，請新增車輛
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
