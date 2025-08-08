"use client";

import { useState } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import WalletHeader from "@/components/dashboard/WalletHeader";
import SummaryCards from "@/components/dashboard/SummaryCards";
import TransactionTable from "@/components/dashboard/TransactionTable";
import { mockTransactions, mockSummary, mockUsers } from "@/data/mockData";

const Dashboard = () => {
  

  return (
    <div className="min-h-screen bg-background w-full">

      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Header */}

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)]">
          {/* Wallet header section */}
          <WalletHeader users={mockUsers} additionalUsersCount={12} />

          {/* Summary cards */}
          <SummaryCards summary={mockSummary} />

          {/* Transaction table */}
          <TransactionTable transactions={mockTransactions} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
