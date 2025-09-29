import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Accounts from './components/Accounts';
import Journal from './components/Journal';
import TrialBalance from './components/TrialBalance';
import './App.css';
import Home from './pages/Home';
import { MODULES } from './pages/modules';

function App() {
  return (
    <Router>
      <header className="topbar">
        <div className="container topbar__inner">
          <div className="topbar__brand">足達會計系統</div>
          <button type="button" className="topbar__button topbar__button--primary">
            登出
          </button>
        </div>
      </header>
      <main className="container app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          {MODULES.map((module) => {
            const ModuleComponent = module.component;
            return (
              <Route
                key={module.key}
                path={module.path}
                element={<ModuleComponent />}
              />
            );
          })}
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/trial-balance" element={<TrialBalance />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
