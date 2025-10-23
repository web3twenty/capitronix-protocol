"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

// ✅ Define TypeScript interfaces for your data
interface Transaction {
  id: number;
  userId: number;
  transactionType: string;
  amount: string; // comes as string from API
  currency: string;
  phaseId: number | null;
  status: "Completed" | "Pending";
  createdAt: string;
  updatedAt: string;
}

interface TransactionPayload {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  transactions: Transaction[];
}

interface TransactionResponse {
  statusCode: number;
  message: string;
  payload: TransactionPayload;
}

export default function Transactions() {
  const { data: transData } = useQuery<TransactionResponse>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await api.get("/transactions");
      return response.data as TransactionResponse;
    },
  });

  const transactions = transData?.payload.transactions ?? [];

  return (
    <section className="p-4 md:p-6">
      <div className="max-w-7xl bg-[#13171E] border border-[#2A2A2A] rounded-lg">
        <h1 className="text-lg text-white font-medium px-[20px] py-[10px]">
          Transactions
        </h1>

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
                Currency
              </th>
              <th scope="col" className="px-4 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A2A]">
            {transactions.map((tx) => (
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
                  {parseFloat(tx.amount) > 0 ? "+" : ""}
                  {new Intl.NumberFormat("en-US").format(parseFloat(tx.amount))}
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  {tx.currency}
                </td>
                <td className="px-4 py-3">
                  {tx.status === "Completed" ? (
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
          </tbody>
        </table>
      </div>
    </section>
  );
}
