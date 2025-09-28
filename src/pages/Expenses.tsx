import React from 'react';
import { Link } from 'react-router-dom';

const Expenses = () => (
  <section className="py-4">
    <header className="mb-4">
      <h1 className="h3 mb-2">各項費用管理系統</h1>
      <p className="text-muted mb-0">管理稅金、保險、貸款、工會及雜支等費用，掌握支出狀況。</p>
    </header>
    <p>
      未來將整合費用申請、憑證管理與核銷流程，快速掌握多項費用的支出明細。
    </p>
    <Link className="btn btn-outline-primary" to="/">
      返回首頁
    </Link>
  </section>
);

export default Expenses;
