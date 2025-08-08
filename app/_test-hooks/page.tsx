"use client";

import {
  useDashboardSummary,
  useTransactions,
  useCreateTransaction,
  useDeleteTransaction,
  useRefreshDashboard,
} from "@/hooks/api/useDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestHooksPage() {
  // Query hooks
  const {
    data: summary,
    isLoading: summaryLoading,
    error: summaryError,
  } = useDashboardSummary();

  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useTransactions();

  // Mutation hooks
  const createTransactionMutation = useCreateTransaction();
  const deleteTransactionMutation = useDeleteTransaction();
  const refreshDashboard = useRefreshDashboard();

  const handleCreateTransaction = () => {
    createTransactionMutation.mutate({
      date: new Date().toISOString().split("T")[0],
      remark: "Test Transaction",
      amount: Math.floor(Math.random() * 1000) + 1,
      currency: "USD",
      type: Math.random() > 0.5 ? "Credit" : "Debit",
    });
  };

  const handleDeleteTransaction = (id: string) => {
    deleteTransactionMutation.mutate(id);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">TanStack Query Hooks Test</h1>
        <div className="space-x-2">
          <Button onClick={refreshDashboard}>Refresh All Data</Button>
          <Button
            onClick={handleCreateTransaction}
            disabled={createTransactionMutation.isPending}
          >
            {createTransactionMutation.isPending
              ? "Creating..."
              : "Create Transaction"}
          </Button>
        </div>
      </div>

      {/* Summary Section */}
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {summaryLoading && <p>Loading summary...</p>}
          {summaryError && (
            <p className="text-red-500">Error: {summaryError.message}</p>
          )}
          {summary && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Balance</p>
                <p className="text-2xl font-bold">
                  ${summary.totalBalance.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">
                  +{summary.balanceChange}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Credits</p>
                <p className="text-2xl font-bold">
                  ${summary.totalCredits.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">
                  +{summary.creditsChange}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Debits</p>
                <p className="text-2xl font-bold">
                  ${summary.totalDebits.toLocaleString()}
                </p>
                <p className="text-sm text-red-600">{summary.debitsChange}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold">{summary.transactionCount}</p>
                <p className="text-sm text-green-600">
                  +{summary.transactionChange}%
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transactions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {transactionsLoading && <p>Loading transactions...</p>}
          {transactionsError && (
            <p className="text-red-500">Error: {transactionsError.message}</p>
          )}
          {transactionsData && (
            <div>
              <p className="mb-4">
                Showing {transactionsData.transactions.length} of{" "}
                {transactionsData.total} transactions
              </p>
              <div className="space-y-2">
                {transactionsData.transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{transaction.remark}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          transaction.type === "Credit"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "Debit" ? "-" : "+"}$
                        {transaction.amount}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.type}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                      disabled={deleteTransactionMutation.isPending}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mutation Status */}
      {(createTransactionMutation.isError ||
        deleteTransactionMutation.isError) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Mutation Errors</CardTitle>
          </CardHeader>
          <CardContent>
            {createTransactionMutation.isError && (
              <p>Create error: {createTransactionMutation.error?.message}</p>
            )}
            {deleteTransactionMutation.isError && (
              <p>Delete error: {deleteTransactionMutation.error?.message}</p>
            )}
          </CardContent>
        </Card>
      )}

      {(createTransactionMutation.isSuccess ||
        deleteTransactionMutation.isSuccess) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Success</CardTitle>
          </CardHeader>
          <CardContent>
            {createTransactionMutation.isSuccess && (
              <p>Transaction created successfully!</p>
            )}
            {deleteTransactionMutation.isSuccess && (
              <p>Transaction deleted successfully!</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
