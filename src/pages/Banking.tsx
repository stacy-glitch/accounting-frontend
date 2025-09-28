import React from 'react';
import { Link } from 'react-router-dom';

const Banking = () => (
  <section className="py-4">
    <header className="mb-4">
      <h1 className="h3 mb-2">營業收入與銀行管理</h1>
      <p className="text-muted mb-0">整合營業收入、銀行往來、應收票據與匯款帳號管理。</p>
    </header>
    <p>
      後續將提供銀行帳戶對帳、收入分析報表與匯款資訊維護，協助掌握資金流向。
    </p>
    <Link className="btn btn-outline-primary" to="/">
      返回首頁
    </Link>
  </section>
);

export default Banking;
