"use client";

import api from "@/lib/api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import Modal from "react-responsive-modal";
import { useState } from "react";

// ✅ Updated Types
interface Transaction {
  id: string;
  userId: string;
  transactionType: string;
  amount: number;
  currency: string;
  status: "COMPLETED" | "PENDING";
  note?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface TransactionResponse {
  data: Transaction[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function Transactions() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState<boolean>(false);
  const [note, setNote] = useState("");

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const type = searchParams.get("type") || "all";

  const { data: transData, isFetching } = useQuery<TransactionResponse>({
    queryKey: ["transactions", page, limit, type],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (type !== "all") {
        params.set("type", type);
      }

      const response = await api.get(`/user/transactions?${params.toString()}`);
      return response.data as TransactionResponse;
    },
    staleTime: 1000 * 60 * 2,
    placeholderData: keepPreviousData,
  });

  const transactions = transData?.data ?? [];
  const totalItems = transData?.meta.total ?? 0;
  const totalPages = transData?.meta.totalPages ?? 1;
  const currentPage = transData?.meta.page ?? page;

  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endIndex = Math.min(currentPage * limit, totalItems);

  const updateParams = (newParams: {
    page?: number;
    limit?: number;
    type?: string;
  }) => {
    const params = new URLSearchParams(searchParams);

    if (newParams.page) params.set("page", newParams.page.toString());
    if (newParams.limit) params.set("limit", newParams.limit.toString());

    if (newParams.type !== undefined) {
      if (newParams.type === "" || newParams.type === "all") {
        params.delete("type");
      } else {
        params.set("type", newParams.type);
      }
      params.delete("page");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const closeIcon = (
    <span className="mgc_close_line text-white text-[20px]"></span>
  );

  return (
    <>
      <Modal
        open={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        center
        styles={{
          modal: {
            borderRadius: "8px",
            backgroundColor: "#03070D",
            padding: 0,
          },
          overlay: { backgroundColor: "#4A4A4AC2" },
        }}
        closeIcon={closeIcon}
      >
        <div className="bg-[#13171E] px-5 py-3 rounded-t-lg">
          <h2 className="text-xl text-white font-semibold">Referral Info</h2>
          <small className="text-[#E6E6E7]">
            Bonus source and referral level details
          </small>
        </div>

        <div className="p-4 text-[#E6E6E7] space-y-3 text-sm leading-relaxed">
          <p>{note}</p>
        </div>
      </Modal>

      <section className="p-4 md:px-6 md:py-2">
        <div className="max-w-7xl bg-[#13171E] border border-[#2A2A2A] rounded-lg mb-8 mx-auto">
          <div className="flex items-center justify-between px-[20px] py-[10px]">
            <h1 className="text-lg text-white font-medium">Transactions</h1>

            <div className="relative">
              <select
                value={type}
                onChange={(e) => updateParams({ type: e.target.value })}
                className="appearance-none cursor-pointer font-bold bg-[#03070D] border border-[#2A2A2A] text-white text-sm px-3 py-1.5 rounded-md pr-8"
              >
                <option value="all" className="bg-[#1B1F26]">
                  All Types
                </option>

                {[
                  "Referral",
                  "Staking",
                  "Purchase",
                  "Bonus",
                  "Activation",
                  "Rank",
                  "Refund",
                  "Manual",
                  "Sell",
                  "Exchange",
                ].map((t) => (
                  <option key={t} value={t} className="bg-[#1B1F26]">
                    {t}
                  </option>
                ))}
              </select>

              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-white" />
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <div className="min-w-max mx-auto">
              <table className="w-full text-sm text-left text-gray-300 bg-[#03070D] divide-y divide-[#2A2A2A] rounded-lg">
                <thead className="bg-[#25262A] text-gray-200">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-center">Amount</th>
                    <th className="px-4 py-3">Currency</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A2A]">
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span>
                            {tx.transactionType.charAt(0) +
                              tx.transactionType.slice(1).toLowerCase()}
                          </span>

                          {tx.note && (
                            <span
                              className="mgc_information_line text-[20px] p-1"
                              onClick={() => {
                                setNote(tx.note || "");
                                setIsInfoModalOpen(true);
                              }}
                            ></span>
                          )}
                        </div>
                      </td>

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
                        {tx.amount > 0 ? "+" : ""}
                        {tx.amount.toFixed(2)}
                      </td>

                      <td className="px-4 py-3">{tx.currency}</td>

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
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

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
                  className="p-1 rounded-md hover:bg-[#1B1F26] disabled:opacity-40"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    updateParams({
                      page:
                        currentPage < totalPages ? currentPage + 1 : totalPages,
                    })
                  }
                  disabled={currentPage >= totalPages}
                  className="p-1 rounded-md hover:bg-[#1B1F26] disabled:opacity-40"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
