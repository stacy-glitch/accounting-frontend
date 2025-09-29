import type { ComponentType } from 'react';

import Banking from './Banking';
import Cash from './Cash';
import DataMaintenance from './DataMaintenance';
import Expenses from './Expenses';
import Payroll from './Payroll';
import Receivable from './Receivable';
import VehicleCost from './VehicleCost';

export interface ModuleDefinition {
  key: string;
  path: string;
  title: string;
  description: string;
  icon: string;
  forms: { key: string; title: string; description?: string }[];
  component: ComponentType;
}

export const MODULES: ModuleDefinition[] = [
  {
    key: 'cash',
    path: '/cash',
    title: '零用金管理系統',
    description: '管理日常零用金收支，追蹤現金流動。',
    icon: '💰',
    forms: [
      { key: 'cash-create', title: '零用金新增' },
      { key: 'cash-table', title: '零用金表格' },
      { key: 'cash-advance', title: '代墊款管理' },
    ],
    component: Cash,
  },
  {
    key: 'banking',
    path: '/banking',
    title: '營業收入與銀行管理',
    description: '營業收入分析、光豐銀行、基隆二信、應收票據與匯款帳號管理。',
    icon: '📈',
    forms: [
      { key: 'banking-receipt', title: '營業收入登錄' },
      { key: 'banking-reconcile', title: '銀行往來對帳' },
      { key: 'banking-remittance', title: '匯款帳號管理' },
    ],
    component: Banking,
  },
  {
    key: 'payroll',
    path: '/payroll',
    title: '薪資管理系統',
    description: '員工薪資計算與管理，包含勞健保處理與給付。',
    icon: '👥',
    forms: [
      { key: 'payroll-cycle', title: '薪資期別設定' },
      { key: 'payroll-entry', title: '薪資試算與登錄' },
      { key: 'payroll-report', title: '薪資報表匯出' },
    ],
    component: Payroll,
  },
  {
    key: 'expenses',
    path: '/expenses',
    title: '各項費用管理系統',
    description: '管理稅金、保險、貸款、工會及雜支費用。',
    icon: '🧾',
    forms: [
      { key: 'expense-entry', title: '費用報銷申請' },
      { key: 'expense-proof', title: '憑證上傳管理' },
      { key: 'expense-summary', title: '費用分析表' },
    ],
    component: Expenses,
  },
  {
    key: 'vehicle-cost',
    path: '/vehicle-cost',
    title: '車輛成本管理',
    description: '各車輛營運成本分析與收支明細。',
    icon: '🚚',
    forms: [
      { key: 'vehicle-maintenance', title: '維修保養登錄' },
      { key: 'vehicle-mileage', title: '里程與油耗記錄' },
      { key: 'vehicle-cost-report', title: '車輛成本分析表' },
    ],
    component: VehicleCost,
  },
  {
    key: 'receivable',
    path: '/receivable',
    title: '收支管理系統',
    description: '公司收支記錄、財務報表與圖表分析。',
    icon: '📊',
    forms: [
      { key: 'ledger-entry', title: '收支登錄' },
      { key: 'ledger-statement', title: '每月收支表' },
      { key: 'ledger-alert', title: '異常提醒設定' },
    ],
    component: Receivable,
  },
  {
    key: 'data-maintenance',
    path: '/data-maintenance',
    title: '資料維護系統',
    description: '客戶、車輛、員工基本資料與權限設定管理。',
    icon: '🗄️',
    forms: [
      { key: 'master-customer', title: '客戶資料維護' },
      { key: 'master-vehicle', title: '車輛資料維護' },
      { key: 'master-employee', title: '員工資料維護' },
      { key: 'master-account', title: '會計科目維護' },
    ],
    component: DataMaintenance,
  },
];
