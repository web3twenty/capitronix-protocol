"use client";

import api from "@/lib/api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

// ✅ Define TypeScript interfaces
interface Transaction {
  id: number;
  userId: number;
  transactionType: string;
  amount: string;
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
  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ Read values from URL or fallback
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  // ✅ Fetch data from server using query params
  const { data: transData, isFetching } = useQuery<TransactionResponse>({
    queryKey: ["transactions", page, limit],
    queryFn: async () => {
      const response = await api.get(
        `/transactions?page=${page}&limit=${limit}`
      );
      return response.data as TransactionResponse;
    },
    staleTime: 1000 * 60 * 2,
    placeholderData: keepPreviousData,
  });

  const payload = transData?.payload;
  const transactions = payload?.transactions ?? [];
  const totalItems = payload?.totalItems ?? 0;
  const totalPages = payload?.totalPages ?? 1;
  const currentPage = payload?.currentPage ?? page;

  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endIndex = Math.min(currentPage * limit, totalItems);

  // ✅ Helper to update URL without reload
  const updateParams = (newParams: { page?: number; limit?: number }) => {
    const params = new URLSearchParams(searchParams);
    if (newParams.page) params.set("page", newParams.page.toString());
    if (newParams.limit) params.set("limit", newParams.limit.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="p-4 md:px-6 md:py-2">
      <div className="max-w-7xl bg-[#13171E] border border-[#2A2A2A] rounded-lg mb-8 mx-auto">
        <h1 className="text-lg text-white font-medium px-[20px] py-[10px]">
          Transactions
        </h1>

        <div className="overflow-x-auto w-full">
          <div className="min-w-max mx-auto">
            <table className="w-full text-sm text-left text-gray-300 bg-[#03070D] divide-y divide-[#2A2A2A] rounded-lg">
              <thead className="bg-[#25262A] text-gray-200">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-3">
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
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(tx.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {Number(tx.amount).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">{tx.currency}</td>
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

                {transactions.length === 0 && !isFetching && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-6 text-center text-gray-400"
                    >
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center rounded-bl-lg rounded-br-lg justify-end gap-4 px-4 py-3 border-t border-[#2A2A2A] text-sm text-gray-300 bg-[#03070D]">
          <div className="items-center space-x-2 hidden md:flex">
            <span>Rows per page:</span>
            <div className="relative">
              <select
                className="appearance-none cursor-pointer font-bold bg-transparent border border-[#2A2A2A] text-white text-sm px-2 py-1 rounded-md pr-6"
                value={limit}
                onChange={(e) =>
                  updateParams({ page: 1, limit: Number(e.target.value) })
                }
              >
                {[5, 10, 25, 50].map((n) => (
                  <option key={n} value={n} className="bg-[#1B1F26]">
                    {n}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-white" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <span>
              {startIndex} – {endIndex} of {totalItems}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  updateParams({ page: Math.max(currentPage - 1, 1) })
                }
                disabled={currentPage === 1}
                className="p-1 rounded-md hover:bg-[#1B1F26] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 cursor-pointer" />
              </button>
              <button
                onClick={() =>
                  updateParams({
                    page:
                      currentPage < totalPages ? currentPage + 1 : totalPages,
                  })
                }
                disabled={currentPage >= totalPages}
                className="p-1 rounded-md hover:bg-[#1B1F26] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
