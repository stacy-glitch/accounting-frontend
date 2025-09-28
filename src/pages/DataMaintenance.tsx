import React from 'react';
import { Link } from 'react-router-dom';

const DataMaintenance = () => (
  <section className="py-4">
    <header className="mb-4">
      <h1 className="h3 mb-2">資料維護系統</h1>
      <p className="text-muted mb-0">維護主檔資料、參數設定與權限配置，確保資料一致可靠。</p>
    </header>
    <p>
      此處將納入客戶、車輛與員工資料維護，以及異動紀錄與批次更新工具，提升資料治理效率。
    </p>
    <Link className="btn btn-outline-primary" to="/">
      返回首頁
    </Link>
  </section>
);

export default DataMaintenance;
