import React from 'react';

interface MaintenanceLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

const TABS: { key: string; label: string }[] = [
  { key: 'master-customer', label: '客戶資料' },
  { key: 'master-vehicle', label: '車輛資料' },
  { key: 'master-employee', label: '員工資料' },
  { key: 'master-account', label: '會計科目' },
];

const MaintenanceLayout: React.FC<MaintenanceLayoutProps> = ({ activeTab, onTabChange, children }) => {
  return (
    <div className="maintenance">
      <header className="maintenance__hero">
        <h1 className="maintenance__title">資料維護系統</h1>
        <p className="maintenance__subtitle">客戶、車輛、員工基本資料管理</p>
      </header>

      <nav className="maintenance__tabs" aria-label="資料維護切換">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`maintenance__tab${tab.key === activeTab ? ' is-active' : ''}`}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <section className="maintenance__content">{children}</section>
    </div>
  );
};

export default MaintenanceLayout;
