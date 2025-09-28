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


// --- API Functions ---

// Accounts
export const getAccounts = () => apiClient.get<Account[]>('/accounts/');
export const createAccount = (data: { name: string; category: string }) => apiClient.post<Account>('/accounts/', data);

// Journal Entries
export const getJournalEntries = () => apiClient.get<JournalEntry[]>('/journal-entries/');
export const createJournalEntry = (data: JournalEntryPayload) => apiClient.post<JournalEntry[]>('/journal-entries/', data);

// Reports
export const getTrialBalance = () => apiClient.get<TrialBalanceEntry[]>('/reports/trial-balance/');
