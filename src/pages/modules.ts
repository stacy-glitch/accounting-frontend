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
  component: ComponentType;
}

export const MODULES: ModuleDefinition[] = [
  {
    key: 'cash',
    path: '/cash',
    title: '零用金管理系統',
    description: '管理日常零用金收支，追蹤現金流動。',
    icon: '💰',
    component: Cash,
  },
  {
    key: 'banking',
    path: '/banking',
    title: '營業收入與銀行管理',
    description: '營業收入分析、光豐銀行、基隆二信、應收票據與匯款帳號管理。',
    icon: '📈',
    component: Banking,
  },
  {
    key: 'payroll',
    path: '/payroll',
    title: '薪資管理系統',
    description: '員工薪資計算與管理，包含勞健保處理與給付。',
    icon: '👥',
    component: Payroll,
  },
  {
    key: 'expenses',
    path: '/expenses',
    title: '各項費用管理系統',
    description: '管理稅金、保險、貸款、工會及雜支費用。',
    icon: '🧾',
    component: Expenses,
  },
  {
    key: 'receivable',
    path: '/receivable',
    title: '收支管理系統',
    description: '公司收支記錄、財務報表與圖表分析。',
    icon: '📊',
    component: Receivable,
  },
  {
    key: 'vehicle-cost',
    path: '/vehicle-cost',
    title: '車輛成本管理',
    description: '各車輛營運成本分析與收支明細。',
    icon: '🚚',
    component: VehicleCost,
  },
  {
    key: 'data-maintenance',
    path: '/data-maintenance',
    title: '資料維護系統',
    description: '客戶、車輛、員工基本資料與權限設定管理。',
    icon: '🗄️',
    component: DataMaintenance,
  },
];
