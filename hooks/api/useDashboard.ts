import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardApi } from "@/api/dashboard";
import { Transaction } from "@/types/dashboard";

// Query key factory for consistent cache management
export const dashboardKeys = {
  all: ["dashboard"] as const,
  summary: () => [...dashboardKeys.all, "summary"] as const,
  transactions: () => [...dashboardKeys.all, "transactions"] as const,
  transactionList: (params?: any) =>
    [...dashboardKeys.transactions(), "list", params] as const,
  transaction: (id: string) =>
    [...dashboardKeys.transactions(), "detail", id] as const,
  stats: (params?: any) => [...dashboardKeys.all, "stats", params] as const,
};

// We wrap in hooks for cleaner components and to avoid repeating the same code
export const useDashboardSummary = () => {
  return useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn: dashboardApi.getSummary,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook for fetching transactions with filters
export const useTransactions = (params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  type?: "Credit" | "Debit";
  dateFrom?: string;
  dateTo?: string;
}) => {
  return useQuery({
    queryKey: dashboardKeys.transactionList(params),
    queryFn: () => dashboardApi.getTransactions(params),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

// Hook for fetching a single transaction
export const useTransaction = (id: string) => {
  return useQuery({
    queryKey: dashboardKeys.transaction(id),
    queryFn: () => dashboardApi.getTransaction(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for fetching transaction statistics
export const useTransactionStats = (params?: {
  period?: "week" | "month" | "quarter" | "year";
  dateFrom?: string;
  dateTo?: string;
}) => {
  return useQuery({
    queryKey: dashboardKeys.stats(params),
    queryFn: () => dashboardApi.getTransactionStats(params),
    staleTime: 10 * 60 * 1000, // 10 minutes for stats
  });
};

// Mutation hook for creating transactions
export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transaction: Omit<Transaction, "id">) =>
      dashboardApi.createTransaction(transaction),
    onSuccess: (newTransaction) => {
      // Invalidate and refetch transactions list
      queryClient.invalidateQueries({ queryKey: dashboardKeys.transactions() });

      // Invalidate summary to update totals
      queryClient.invalidateQueries({ queryKey: dashboardKeys.summary() });

      // Invalidate stats
      queryClient.invalidateQueries({ queryKey: dashboardKeys.stats() });

      // Optionally add the new transaction to the cache, optional i guess
      queryClient.setQueryData(
        dashboardKeys.transaction(newTransaction.id),
        newTransaction
      );
    },
    onError: (error) => {
      console.error("Failed to create transaction:", error);
    },
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Omit<Transaction, "id">>;
    }) => dashboardApi.updateTransaction(id, updates),
    onSuccess: (updatedTransaction, { id }) => {
      // Update the specific transaction in cache
      queryClient.setQueryData(
        dashboardKeys.transaction(id),
        updatedTransaction
      );

      // Invalidate transactions list to reflect changes
      queryClient.invalidateQueries({ queryKey: dashboardKeys.transactions() });

      // Invalidate summary and stats
      queryClient.invalidateQueries({ queryKey: dashboardKeys.summary() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.stats() });
    },
    onError: (error) => {
      console.error("Failed to update transaction:", error);
    },
  });
};

// Mutation hook for deleting transactions
export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => dashboardApi.deleteTransaction(id),
    onSuccess: (_, deletedId) => {
      // Remove the transaction from cache
      queryClient.removeQueries({
        queryKey: dashboardKeys.transaction(deletedId),
      });

      // Invalidate transactions list
      queryClient.invalidateQueries({ queryKey: dashboardKeys.transactions() });

      // Invalidate summary and stats
      queryClient.invalidateQueries({ queryKey: dashboardKeys.summary() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.stats() });
    },
    onError: (error) => {
      console.error("Failed to delete transaction:", error);
    },
  });
};

export const usePrefetchTransactions = () => {
  const queryClient = useQueryClient();

  return (params?: Parameters<typeof useTransactions>[0]) => {
    queryClient.prefetchQuery({
      queryKey: dashboardKeys.transactionList(params),
      queryFn: () => dashboardApi.getTransactions(params),
      staleTime: 2 * 60 * 1000,
    });
  };
};

// Utility hook for manually refetching all dashboard data
export const useRefreshDashboard = () => {
  const queryClient = useQueryClient();

  return () => {
    return queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
  };
};
