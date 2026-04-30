import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import React, { createContext } from "react";

export interface Stats {
  TOKEN_PRICE: number;
  ACTIVE_PHASE: string;
  ACTIVATION_USDT: number;

  totalPurchase: number;
  referralEarnings: number;
  boardEarnings: number;
  stakedBalance: number;
  totalWithdraw: number;

  DEPOSIT_SETTINGS: DepositSettings;
  PROFIT_MAP: Record<string, number>;
  RANKING_MAP: Record<string, number>;

  STAKING_DETAILS: StakingDetails;
  FOUNDER_DETAILS: FounderDetails;

  tokenWallet: number;
  usdtWallet: number;
  rewardWallet: number;

  phaseInfo: PhaseInfo;
}

export interface DepositSettings {
  sellCharge: number;
  minimumSell: number;
  minimumDeposit: number;
  withdrawCharge: number;
  minimumBuyToken: number;
  minimumExchange: number;
  minimumWithdraw: number;
}

export interface StakingDetails {
  apy: number;
  maximum: number;
  minimum: number;
  durationDays: number;
}

export interface FounderDetails {
  totalSeat: number;
  minimumInvestment: number;
}

export interface PhaseInfo {
  totalSupply: string;
  totalAvailable: string;
}

export const LayoutContext = createContext<Stats | undefined>(undefined);

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: () => api.get("/user/dashboard/stats").then((res) => res.data),
  });

  return (
    <LayoutContext.Provider value={stats}>{children}</LayoutContext.Provider>
  );
}
