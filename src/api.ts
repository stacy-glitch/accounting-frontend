import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // The address of the FastAPI backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define interfaces for the data types to ensure type safety
export interface Account {
  id: number;
  name: string;
  category: string;
}

export interface JournalEntry {
    id: number;
    transaction_id: number;
    account_id: number;
    debit: number;
    credit: number;
    description: string;
    account: Account;
}

export interface JournalEntryPayload {
    entries: {
        account_id: number;
        debit: number;
        credit: number;
    }[];
    description: string;
}

export interface TrialBalanceEntry {
    account_name: string;
    total_debit: number;
    total_credit: number;
}

export interface CustomerRecord {
  code: string;
  name: string;
  tax_id: string;
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

export interface AccountMappingRecord {
  mapping: string;
  name: string;
}


// --- API Functions ---

// Accounts
export const getAccounts = () => apiClient.get<Account[]>('/accounts/');
export const createAccount = (data: { name: string; category: string }) => apiClient.post<Account>('/accounts/', data);

// Journal Entries
export const getJournalEntries = () => apiClient.get<JournalEntry[]>('/journal-entries/');
export const createJournalEntry = (data: JournalEntryPayload) => apiClient.post<JournalEntry[]>('/journal-entries/', data);

// Reports
export const getTrialBalance = () => apiClient.get<TrialBalanceEntry[]>('/reports/trial-balance/');

// Master Data
export const getCustomersMaster = () => apiClient.get<CustomerRecord[]>('/master/customers/');
export const replaceCustomersMaster = (data: CustomerRecord[]) => apiClient.post<CustomerRecord[]>('/master/customers/import', data);

export const getVehiclesMaster = () => apiClient.get<VehicleRecord[]>('/master/vehicles/');
export const replaceVehiclesMaster = (data: VehicleRecord[]) => apiClient.post<VehicleRecord[]>('/master/vehicles/import', data);

export const getEmployeesMaster = () => apiClient.get<EmployeeRecord[]>('/master/employees/');
export const replaceEmployeesMaster = (data: EmployeeRecord[]) => apiClient.post<EmployeeRecord[]>('/master/employees/import', data);

export const getAccountMappingsMaster = () => apiClient.get<AccountMappingRecord[]>('/master/accounts/');
export const replaceAccountMappingsMaster = (data: AccountMappingRecord[]) => apiClient.post<AccountMappingRecord[]>('/master/accounts/import', data);
