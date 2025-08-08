import {
  Transaction,
  DashboardSummary,
  Profile,
  UserProfilesResponse,
} from "@/types/dashboard";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2023-10-01",
    remark: "Salary",
    amount: 3000,
    currency: "USD",
    type: "Credit",
  },
  {
    id: "2",
    date: "2023-10-02",
    remark: "Groceries",
    amount: 150,
    currency: "USD",
    type: "Debit",
  },
  {
    id: "3",
    date: "2023-10-03",
    remark: "Gym Membership",
    amount: 50,
    currency: "USD",
    type: "Debit",
  },
  {
    id: "4",
    date: "2023-10-04",
    remark: "Dinner",
    amount: 40,
    currency: "USD",
    type: "Debit",
  },
  {
    id: "5",
    date: "2023-10-05",
    remark: "Movie Tickets",
    amount: 30,
    currency: "USD",
    type: "Debit",
  },
  {
    id: "6",
    date: "2023-10-06",
    remark: "Rent",
    amount: 1200,
    currency: "USD",
    type: "Debit",
  },
  {
    id: "7",
    date: "2023-10-07",
    remark: "Utilities",
    amount: 100,
    currency: "USD",
    type: "Debit",
  },
  {
    id: "8",
    date: "2023-10-08",
    remark: "Car Payment",
    amount: 400,
    currency: "USD",
    type: "Debit",
  },
  {
    id: "9",
    date: "2023-10-09",
    remark: "Insurance",
    amount: 200,
    currency: "USD",
    type: "Debit",
  },
];

// Empty transactions for testing empty state
export const emptyTransactions: Transaction[] = [];

// Invalid transactions for testing validation (these will be filtered out)
export const invalidTransactions = [
  {
    id: "invalid1",
    date: "invalid-date",
    remark: "Test",
    amount: "not-a-number",
    currency: "USD",
    type: "Credit",
  },
  {
    id: "",
    date: "2023-10-01",
    remark: "",
    amount: -100,
    currency: "INVALID",
    type: "InvalidType",
  },
  null,
  undefined,
  "not-an-object",
];

export const mockUsers = [
  { name: "Ava Johnson", avatar: "" },
  { name: "Liam Smith", avatar: "" },
  { name: "Noah Brown", avatar: "" },
  { name: "Emma Davis", avatar: "" },
];

export const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "John Doe",
    image: "/profile-1.png",
    email: "john.doe@example.com",
    role: "Admin",
  },
  {
    id: "2",
    name: "Jane Smith",
    image: "/profile-2.png",
    email: "jane.smith@example.com",
    role: "User",
  },
  {
    id: "3",
    name: "Mike Johnson",
    image: "/profile-3.png",
    email: "mike.johnson@example.com",
    role: "User",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    image: "/profile-4.png",
    email: "sarah.wilson@example.com",
    role: "User",
  },
];

export const mockProfilesResponse: UserProfilesResponse = {
  profiles: mockProfiles,
  additionalCount: 12,
  total: 16,
};

export const mockSummary: DashboardSummary = {
  totalBalance: 12345,
  totalCredits: 7890,
  totalDebits: 4455,
  transactionCount: 150,
  balanceChange: 5,
  creditsChange: 3,
  debitsChange: -2,
  transactionChange: 10,
};

// Invalid summary for testing validation
export const invalidSummary = {
  totalBalance: "not-a-number",
  totalCredits: NaN,
  missingFields: true,
};
