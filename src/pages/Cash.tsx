import React from 'react';
import { Link } from 'react-router-dom';

const Cash = () => (
  <section className="py-4">
    <header className="mb-4">
      <h1 className="h3 mb-2">零用金管理系統</h1>
      <p className="text-muted mb-0">管理日常零用金收支，追蹤現金流動並掌握餘額變化。</p>
    </header>
    <p>
      預計提供零用金申領、收支紀錄與帳實核對等功能，協助即時掌握現金狀態。
    </p>
    <Link className="btn btn-outline-primary" to="/">
      返回首頁
    </Link>
  </section>
);

export default Cash;
