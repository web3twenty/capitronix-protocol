"use client";

import Image from "next/image";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface History {
  id: number;
  userId: number;
  transactionType: string;
  amount: string;
  from: string;
  status: "Completed" | "Pending";
  createdAt: string;
  updatedAt: string;
}

interface TransactionPayload {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  histories: History[];
}

export default function WalletWithTransactions() {
  // Wallet queries
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get("/user/profile").then((res) => res.data),
  });

  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: () => api.get("/user/dashboard/stats").then((res) => res.data),
  });

  // Top 5 transactions query
  const { data: transactions = [], isFetching } = useQuery({
    queryKey: ["histories", "top30"],
    queryFn: () => api.get("/user/wallet?limit=30").then((res) => res.data),
  });

  return (
    <section className="p-4 md:px-6 md:py-2">
      <div className="max-w-5xl mx-auto mb-8">
        {/* Wallet Grid */}
        <h2 className="text-white mb-2">Wallet Balance</h2>
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-4 md:gap-5 mb-8">
          <div className="flex items-center justify-between bg-[#FFC200] rounded-lg p-5">
            <Image
              src="/3twenty-coin.png"
              alt="3twenty"
              width={64}
              height={64}
            />
            <div>
              <small className="text-[#434347]">3Twenty Coin</small>
              <h3 className="text-2xl font-medium text-[#121213]">
                {Number(profile?.tokenWallet || 0).toFixed(2)}
              </h3>
              <small className="text-[#121213]">
                ≈$
                {Number(stats?.TOKEN_PRICE * profile?.tokenWallet || 0).toFixed(
                  2,
                )}
              </small>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#25262A] rounded-lg p-5">
            <span className="mgc_currency_dollar_line text-[64px] text-[#FFC200]"></span>
            <div>
              <small className="text-[#AEAFB2]">USDT Balance</small>
              <h3 className="text-2xl font-medium text-white">
                ${Number(profile?.usdtWallet || 0).toFixed(2)}
              </h3>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#25262A] rounded-lg p-5">
            <span className="mgc_bank_card_line text-[64px] text-[#FFC200]"></span>
            <div>
              <small className="text-[#AEAFB2]">Total Purchase</small>
              <h3 className="text-2xl font-medium text-white">
                ${Number(stats?.totalPurchase || 0).toFixed(2)}
              </h3>
            </div>
          </div>
        </div>

        {/* Top 5 Transactions */}
        <div className="max-w-7xl bg-[#13171E] border border-[#2A2A2A] rounded-lg">
          <div className="flex items-center justify-between px-[20px] py-[10px]">
            <h1 className="text-lg text-white font-medium">
              Recent Transactions
            </h1>
            {/* <Link
              href="/dashboard/transactions"
              className="text-[#FFC200] text-[14px] font-medium hover:text-[#E6AC00]"
            >
              View All
            </Link> */}
          </div>

          <table className="w-full text-sm text-left text-gray-300 bg-[#03070D] divide-y divide-[#2A2A2A] rounded-lg">
            <thead className="bg-[#25262A] text-gray-200">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Type
                </th>
                <th scope="col" className="px-4 py-3 hidden sm:table-cell">
                  Date
                </th>
                <th scope="col" className="px-4 py-3 text-center">
                  Amount
                </th>
                <th scope="col" className="px-4 py-3 hidden sm:table-cell">
                  Txn Ref
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2A]">
              {transactions.map((tx: any) => (
                <tr key={tx.id}>
                  <td className="px-4 py-3">{tx.transactionType}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {new Date(tx.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {tx.usdtAmount > 0 ? "+" : ""}
                    {Number(tx.usdtAmount).toFixed(2)} USDT
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {tx.transactionHash || tx.toAddress || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {tx.status === "COMPLETED" ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400">
                        Completed
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {transactions.length === 0 && !isFetching && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-400"
                  >
                    No recent transactions.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
