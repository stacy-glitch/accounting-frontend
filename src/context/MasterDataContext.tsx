import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import {
  getCustomersMaster,
  replaceCustomersMaster,
  getVehiclesMaster,
  replaceVehiclesMaster,
  getEmployeesMaster,
  replaceEmployeesMaster,
  getAccountMappingsMaster,
  replaceAccountMappingsMaster,
  CustomerRecord as CustomerApiRecord,
  VehicleRecord as VehicleApiRecord,
  EmployeeRecord as EmployeeApiRecord,
  AccountMappingRecord as AccountApiRecord,
} from '../api';

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
    (async () => {
      try {
        const [customerRes, vehicleRes, employeeRes, accountRes] = await Promise.all([
          getCustomersMaster(),
          getVehiclesMaster(),
          getEmployeesMaster(),
          getAccountMappingsMaster(),
        ]);
        setCustomers(customerRes.data.map(mapCustomerFromApi));
        setVehicles(vehicleRes.data.map(mapVehicleFromApi));
        setEmployees(employeeRes.data.map(mapEmployeeFromApi));
        setAccounts(accountRes.data.map(mapAccountFromApi));
      } catch (error) {
        console.warn('Failed to fetch master data', error);
      }
    })();
  }, []);

  const importCustomers = async (file: File) => {
    const text = await readFileAsText(file);
    const { headers, rows } = parseCsv(text);
    const baseHeaders = ['code', 'name', 'contact', 'phone'];
    const hasTaxId = headers.includes('tax_id') || headers.includes('taxId');
    if (!baseHeaders.every((key) => headers.includes(key)) || !hasTaxId) {
      throw new Error('客戶代號表格式錯誤，請確認欄位：code,name,tax_id,contact,phone');
    }
    const mapped = rows.map((row) => ({
      code: row.code ?? '',
      name: row.name ?? '',
      taxId: row.tax_id ?? row.taxId ?? '',
      contact: row.contact ?? '',
      phone: row.phone ?? '',
    }));
    const payload: CustomerApiRecord[] = mapped.map(mapCustomerToApi);
    const response = await replaceCustomersMaster(payload);
    setCustomers(response.data.map(mapCustomerFromApi));
  };

  const importVehicles = async (file: File) => {
    const text = await readFileAsText(file);
    const { headers, rows } = parseCsv(text);
    const expected = ['code', 'plate', 'model', 'brand', 'driver', 'license', 'permit'];
    if (!ensureHeaders(headers, expected)) {
      throw new Error('車輛代號表格式錯誤，請確認欄位：code,plate,model,brand,driver,license,permit');
    }
    const mapped = rows.map((row) => ({
      code: row.code ?? '',
      plate: row.plate ?? '',
      model: row.model ?? '',
      brand: row.brand ?? '',
      driver: row.driver ?? '',
      license: row.license ?? '',
      permit: row.permit ?? '',
    }));
    const response = await replaceVehiclesMaster(mapped);
    setVehicles(response.data.map(mapVehicleFromApi));
  };

  const importEmployees = async (file: File) => {
    const text = await readFileAsText(file);
    const { headers, rows } = parseCsv(text);
    const expected = ['code', 'name', 'phone'];
    if (!ensureHeaders(headers, expected)) {
      throw new Error('員工代號表格式錯誤，請確認欄位：code,name,phone');
    }
    const mapped = rows.map((row) => ({
      code: row.code ?? '',
      name: row.name ?? '',
      phone: row.phone ?? '',
    }));
    const response = await replaceEmployeesMaster(mapped);
    setEmployees(response.data.map(mapEmployeeFromApi));
  };

  const importAccounts = async (file: File) => {
    const text = await readFileAsText(file);
    const { headers, rows } = parseCsv(text);
    const expected = ['mapping', 'name'];
    if (!ensureHeaders(headers, expected)) {
      throw new Error('會計科目表格式錯誤，請確認欄位：mapping,name');
    }
    const mapped = rows.map((row) => ({
      mapping: row.mapping ?? '',
      name: row.name ?? '',
    }));
    const response = await replaceAccountMappingsMaster(mapped);
    setAccounts(response.data.map(mapAccountFromApi));
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

const mapCustomerFromApi = (item: CustomerApiRecord): CustomerRecord => ({
  code: item.code,
  name: item.name,
  taxId: item.tax_id,
  contact: item.contact,
  phone: item.phone,
});

const mapCustomerToApi = (item: CustomerRecord): CustomerApiRecord => ({
  code: item.code,
  name: item.name,
  tax_id: item.taxId,
  contact: item.contact,
  phone: item.phone,
});

const mapVehicleFromApi = (item: VehicleApiRecord): VehicleRecord => ({
  code: item.code,
  plate: item.plate,
  model: item.model,
  brand: item.brand,
  driver: item.driver,
  license: item.license,
  permit: item.permit,
});

const mapEmployeeFromApi = (item: EmployeeApiRecord): EmployeeRecord => ({
  code: item.code,
  name: item.name,
  phone: item.phone,
});

const mapAccountFromApi = (item: AccountApiRecord): AccountRecord => ({
  mapping: item.mapping,
  name: item.name,
});
