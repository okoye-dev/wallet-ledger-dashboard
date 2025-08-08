export interface Transaction {
  id: string;
  date: string;
  remark: string;
  amount: number;
  currency: string;
  type: "Credit" | "Debit";
}

export interface DashboardSummary {
  totalBalance: number;
  totalCredits: number;
  totalDebits: number;
  transactionCount: number;
  balanceChange: number;
  creditsChange: number;
  debitsChange: number;
  transactionChange: number;
}

export interface Profile {
  id: string;
  name: string;
  image: string;
  email?: string;
  role?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface UserProfilesResponse {
  profiles: Profile[];
  additionalCount: number;
  total: number;
}

export type SortDirection = "asc" | "desc";
export type SortField = "date" | "remark" | "amount" | "currency" | "type";
