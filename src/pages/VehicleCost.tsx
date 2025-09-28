import React from 'react';
import { Link } from 'react-router-dom';

const VehicleCost = () => (
  <section className="py-4">
    <header className="mb-4">
      <h1 className="h3 mb-2">車輛成本管理</h1>
      <p className="text-muted mb-0">統整車輛維修、油耗、保險與折舊，掌握營運成本。</p>
    </header>
    <p>
      後續將提供車輛成本分析、支出明細與預警功能，協助最佳化車隊運營效率。
    </p>
    <Link className="btn btn-outline-primary" to="/">
      返回首頁
    </Link>
  </section>
);

export default VehicleCost;
