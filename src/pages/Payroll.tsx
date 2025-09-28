import React from 'react';
import { Link } from 'react-router-dom';

const Payroll = () => (
  <section className="py-4">
    <header className="mb-4">
      <h1 className="h3 mb-2">薪資管理系統</h1>
      <p className="text-muted mb-0">集中管理薪資計算、給付作業與勞健保申報流程。</p>
    </header>
    <p>
      預計提供薪資期別設定、員工津貼與扣除項目管理，以及產生薪資報表與轉帳資料。
    </p>
    <Link className="btn btn-outline-primary" to="/">
      返回首頁
    </Link>
  </section>
);

export default Payroll;
