import { apiService } from "./service";
import { Transaction, DashboardSummary } from "@/types/dashboard";
import { mockTransactions, mockSummary } from "@/data/mockData";

// Just gonna simulate some minor API delay ;)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardApi = {
  getSummary: async (): Promise<DashboardSummary> => {
    await delay(200);

    // In the real app, this would be:
    // return apiService.get<DashboardSummary>("/dashboard/summary");

    return mockSummary;
  },

  getTransactions: async (params?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    type?: "Credit" | "Debit";
    dateFrom?: string;
    dateTo?: string;
  }): Promise<{
    transactions: Transaction[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    await delay(600);

    // Some pagination simulation
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const total = mockTransactions.length;
    const totalPages = Math.ceil(total / limit);

    // filtering and sorting
    let filteredTransactions = [...mockTransactions];

    if (params?.type) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.type === params.type
      );
    }

    if (params?.sortBy === "date") {
      filteredTransactions.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return params.sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    if (params?.sortBy === "amount") {
      filteredTransactions.sort((a, b) => {
        return params.sortOrder === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const transactions = filteredTransactions.slice(startIndex, endIndex);

    return {
      transactions,
      total: filteredTransactions.length,
      page,
      totalPages: Math.ceil(filteredTransactions.length / limit),
    };
  },

  // Get single transaction
  getTransaction: async (id: string): Promise<Transaction> => {
    await delay(400);

    // In the real app:
    // return apiService.get<Transaction>(`/dashboard/transactions/${id}`);
    // you get the idea

    const transaction = mockTransactions.find((t) => t.id === id);
    if (!transaction) {
      throw new Error(`Transaction with id ${id} not found`);
    }

    return transaction;
  },

  createTransaction: async (
    transaction: Omit<Transaction, "id">
  ): Promise<Transaction> => {
    await delay(1000);

    const newTransaction: Transaction = {
      ...transaction,
      id: `mock-${Date.now()}`,
    };

    return newTransaction;
  },

  updateTransaction: async (
    id: string,
    updates: Partial<Omit<Transaction, "id">>
  ): Promise<Transaction> => {
    await delay(800);

    const existingTransaction = mockTransactions.find((t) => t.id === id);
    if (!existingTransaction) {
      throw new Error(`Transaction with id ${id} not found`);
    }

    return {
      ...existingTransaction,
      ...updates,
    };
  },

  deleteTransaction: async (id: string): Promise<void> => {
    await delay(600);

    const transaction = mockTransactions.find((t) => t.id === id);
    if (!transaction) {
      throw new Error(`Transaction with id ${id} not found`);
    }

    return;
  },

  // Seems like this would exist, idk
  getTransactionStats: async (params?: {
    period?: "week" | "month" | "quarter" | "year";
    dateFrom?: string;
    dateTo?: string;
  }): Promise<{
    totalCredits: number;
    totalDebits: number;
    netAmount: number;
    transactionCount: number;
    averageTransactionAmount: number;
    largestTransaction: Transaction;
    smallestTransaction: Transaction;
  }> => {
    await delay(700);

    const credits = mockTransactions.filter((t) => t.type === "Credit");
    const debits = mockTransactions.filter((t) => t.type === "Debit");

    const totalCredits = credits.reduce((sum, t) => sum + t.amount, 0);
    const totalDebits = debits.reduce((sum, t) => sum + t.amount, 0);
    const allAmounts = mockTransactions.map((t) => t.amount);

    return {
      totalCredits,
      totalDebits,
      netAmount: totalCredits - totalDebits,
      transactionCount: mockTransactions.length,
      averageTransactionAmount:
        allAmounts.reduce((sum, amount) => sum + amount, 0) / allAmounts.length,
      largestTransaction: mockTransactions.reduce((largest, current) =>
        current.amount > largest.amount ? current : largest
      ),
      smallestTransaction: mockTransactions.reduce((smallest, current) =>
        current.amount < smallest.amount ? current : smallest
      ),
    };
  },
};
