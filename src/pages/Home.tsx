import React from 'react';
import { Link } from 'react-router-dom';

import { MODULES } from './modules';

const Home = () => (
  <section className="home-hero">
    <div className="home-hero__inner">
      <header className="home-hero__intro">
        <p className="home-hero__eyebrow">JudaCargo Accounting</p>
        <h1 className="home-hero__title">會計作業核心模組</h1>
        <p className="home-hero__subtitle">
          快速進入日常財務作業，整合現金、銀行、薪資、費用與資料治理。
        </p>
      </header>
      <div className="home-hero__grid">
        {MODULES.map((module) => (
          <Link key={module.key} className="module-card" to={module.path}>
            <span className="module-card__icon" aria-hidden>{module.icon}</span>
            <h2 className="module-card__title">{module.title}</h2>
            <p className="module-card__description">{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default Home;
