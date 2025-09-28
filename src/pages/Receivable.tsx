import React from 'react';
import { Link } from 'react-router-dom';

const Receivable = () => (
  <section className="py-4">
    <header className="mb-4">
      <h1 className="h3 mb-2">收支管理系統</h1>
      <p className="text-muted mb-0">彙整公司收入與支出，提供財務報表與圖表分析。</p>
    </header>
    <p>
      預計整合收支登錄、報表產製與監控指標，協助掌握企業現金流與財務狀況。
    </p>
    <Link className="btn btn-outline-primary" to="/">
      返回首頁
    </Link>
  </section>
);

export default Receivable;
