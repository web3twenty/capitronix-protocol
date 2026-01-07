"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface Staking {
  id: number;
  createdAt: Date;
  amount: string;
  durationDays: number;
  receivedDays: number;
  lastReceived: string;
  apy: string;
  status: "Running" | "Matured";
  dailyReward: number;
}

interface StakingPayload {
  stakings: Staking[];
}

interface StakingResponse {
  statusCode: number;
  message: string;
  payload: StakingPayload;
}

export default function Stakings() {
  const { data: stakeData, isFetching } = useQuery<StakingResponse>({
    queryKey: ["stakings"],
    queryFn: async () => {
      const response = await api.get("/stakings");
      return response.data as StakingResponse;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  const stakings = stakeData?.payload.stakings ?? [];
  const totalStake = stakings.reduce(
    (acc, next) => acc + Number(next.amount),
    0
  );

  return (
    <section className="p-4 md:px-6 md:py-2">
      <div className="max-w-7xl bg-[#13171E] border border-[#2A2A2A] rounded-lg overflow-hidden mb-8 mx-auto">
        <div className="flex items-center justify-between px-[20px] py-[10px]">
          <h1 className="text-lg text-white font-medium">My Stakings</h1>
          <h2 className="font-medium">
            <span className="text-[#FFC200] hidden md:inline">
              Total Stake:{" "}
            </span>
            <span className="text-white">{totalStake} </span>
            <span className="text-[#FFC200]">3TWENTY</span>
          </h2>
        </div>

        <div className="overflow-x-auto w-full">
          <div className="min-w-max">
            <table className="w-full text-sm text-left text-gray-300 bg-[#03070D] divide-y divide-[#2A2A2A] rounded-lg">
              <thead className="bg-[#25262A] text-gray-200">
                <tr>
                  {/* Desktop Only */}
                  <th scope="col" className="px-4 py-3">
                    SL
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Date
                  </th>

                  {/* Always Visible */}
                  <th scope="col" className="px-4 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Daily Reward
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Received Days
                  </th>
                  <th scope="col" className="px-4 py-3">
                    APY (%)
                  </th>

                  {/* Desktop Only */}
                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#2A2A2A]">
                {stakings.map((stake, index) => (
                  <tr key={stake.id}>
                    {/* Desktop Only */}
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">
                      {new Date(stake.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    {/* Always Visible */}
                    <td className="px-4 py-3">
                      {Number(stake.amount).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      {Number(stake.dailyReward).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">{`${stake.receivedDays} / ${stake.durationDays} days`}</td>
                    <td className="px-4 py-3">
                      {Number(stake.apy).toFixed(2)}%
                    </td>

                    {/* Desktop Only */}
                    <td className="px-4 py-3">
                      {stake.status === "Running" ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400">
                          {stake.status}
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-500/20 text-red-400">
                          {stake.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {stakings.length === 0 && !isFetching && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-6 text-center text-gray-400"
                    >
                      No stakings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
