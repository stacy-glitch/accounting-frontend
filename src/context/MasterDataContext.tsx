import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface CustomerRecord {
  code: string;
  name: string;
  taxId: string;
  contact: string;
  phone: string;
}

export interface VehicleRecord {
  code: string;
  plate: string;
  model: string;
  brand: string;
  driver: string;
  license: string;
  permit: string;
}

export interface EmployeeRecord {
  code: string;
  name: string;
  phone: string;
}

export interface AccountRecord {
  mapping: string;
  name: string;
}

interface MasterDataState {
  customers: CustomerRecord[];
  vehicles: VehicleRecord[];
  employees: EmployeeRecord[];
  accounts: AccountRecord[];
  importCustomers: (file: File) => Promise<void>;
  importVehicles: (file: File) => Promise<void>;
  importEmployees: (file: File) => Promise<void>;
  importAccounts: (file: File) => Promise<void>;
}

const STORAGE_KEY = 'masterData';

const MasterDataContext = createContext<MasterDataState | undefined>(undefined);

const readFileAsText = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file, 'utf-8');
  });

const parseCsv = (content: string) => {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length === 0) return { headers: [], rows: [] };

  const headers = lines[0].split(',').map((h) => h.trim());
  const rows = lines.slice(1).map((line) => {
    const cells = line.split(',').map((cell) => cell.trim());
    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = cells[index] ?? '';
    });
    return row;
  });

  return { headers, rows };
};

const ensureHeaders = (headers: string[], required: string[]) =>
  required.every((key) => headers.includes(key));

export const MasterDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [vehicles, setVehicles] = useState<VehicleRecord[]>([]);
  const [employees, setEmployees] = useState<EmployeeRecord[]>([]);
  const [accounts, setAccounts] = useState<AccountRecord[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed.customers) setCustomers(parsed.customers);
      if (parsed.vehicles) setVehicles(parsed.vehicles);
      if (parsed.employees) setEmployees(parsed.employees);
      if (parsed.accounts) setAccounts(parsed.accounts);
    } catch (error) {
      console.warn('Failed to restore master data from storage', error);
    }
  }, []);

  useEffect(() => {
    const payload = { customers, vehicles, employees, accounts };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [customers, vehicles, employees, accounts]);

  const importCustomers = async (file: File) => {
    const text = await readFileAsText(file);
    const { headers, rows } = parseCsv(text);
    const expected = ['code', 'name', 'taxId', 'contact', 'phone'];
    if (!ensureHeaders(headers, expected)) {
      throw new Error('客戶代號表格式錯誤，請確認欄位：code,name,taxId,contact,phone');
    }
    const mapped: CustomerRecord[] = rows.map((row) => ({
      code: row.code ?? '',
      name: row.name ?? '',
      taxId: row.taxId ?? '',
      contact: row.contact ?? '',
      phone: row.phone ?? '',
    }));
    setCustomers(mapped);
  };

  const importVehicles = async (file: File) => {
    const text = await readFileAsText(file);
    const { headers, rows } = parseCsv(text);
    const expected = ['code', 'plate', 'model', 'brand', 'driver', 'license', 'permit'];
    if (!ensureHeaders(headers, expected)) {
      throw new Error('車輛代號表格式錯誤，請確認欄位：code,plate,model,brand,driver,license,permit');
    }
    const mapped: VehicleRecord[] = rows.map((row) => ({
      code: row.code ?? '',
      plate: row.plate ?? '',
      model: row.model ?? '',
      brand: row.brand ?? '',
      driver: row.driver ?? '',
      license: row.license ?? '',
      permit: row.permit ?? '',
    }));
    setVehicles(mapped);
  };

  const importEmployees = async (file: File) => {
    const text = await readFileAsText(file);
    const { headers, rows } = parseCsv(text);
    const expected = ['code', 'name', 'phone'];
    if (!ensureHeaders(headers, expected)) {
      throw new Error('員工代號表格式錯誤，請確認欄位：code,name,phone');
    }
    const mapped: EmployeeRecord[] = rows.map((row) => ({
      code: row.code ?? '',
      name: row.name ?? '',
      phone: row.phone ?? '',
    }));
    setEmployees(mapped);
  };

  const importAccounts = async (file: File) => {
    const text = await readFileAsText(file);
    const { headers, rows } = parseCsv(text);
    const expected = ['mapping', 'name'];
    if (!ensureHeaders(headers, expected)) {
      throw new Error('會計科目表格式錯誤，請確認欄位：mapping,name');
    }
    const mapped: AccountRecord[] = rows.map((row) => ({
      mapping: row.mapping ?? '',
      name: row.name ?? '',
    }));
    setAccounts(mapped);
  };

  const value = useMemo(
    () => ({
      customers,
      vehicles,
      employees,
      accounts,
      importCustomers,
      importVehicles,
      importEmployees,
      importAccounts,
    }),
    [customers, vehicles, employees, accounts]
  );

  return <MasterDataContext.Provider value={value}>{children}</MasterDataContext.Provider>;
};

export const useMasterData = () => {
  const ctx = useContext(MasterDataContext);
  if (!ctx) {
    throw new Error('useMasterData must be used inside MasterDataProvider');
  }
  return ctx;
};
