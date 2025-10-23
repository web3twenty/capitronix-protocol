"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function Deposit() {
  // ✅ Fetch withdraw stats
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await api.get("/dashboard/stats");
      return response.data.payload;
    },
  });

  // ✅ Simple and clean validation schema
  const withdrawSchema = z.object({
    address: z.string().min(10, { message: "Recipient address is required" }),
    amount: z
      .string()
      .min(1, { message: "Amount is required" })
      .refine(
        (val) =>
          !isNaN(parseFloat(val)) &&
          parseFloat(val) >= (stats?.minimumWithdraw || 0),
        {
          message: `Minimum withdraw is ${stats?.minimumWithdraw || 0} USDT`,
        }
      ),
    note: z.string().optional(),
  });

  // Form data type (what the form handles)
  type WithdrawFormData = z.infer<typeof withdrawSchema>;

  // API data type (what gets sent to the server)
  interface WithdrawApiData {
    address: string;
    amount: number;
    note?: string;
  }

  interface WithdrawResponse {
    success: boolean;
    message: string;
  }

  const withdrawMutation = useMutation<
    WithdrawResponse,
    AxiosError<{ message: string }>,
    WithdrawApiData
  >({
    mutationFn: (formData) =>
      api.post("/wallet/withdraw", formData).then((res) => res.data),
    onSuccess: (response) => {
      reset();
      toast(response.message, { type: "success" });
    },
    onError: (error) => {
      toast(error.response?.data?.message || error.message, { type: "error" });
    },
  });

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WithdrawFormData>({
    resolver: zodResolver(withdrawSchema),
  });

  const onSubmit = (data: WithdrawFormData) => {
    // Convert form data to API data
    const apiData: WithdrawApiData = {
      ...data,
      amount: parseFloat(data.amount),
    };

    withdrawMutation.mutate(apiData, {
      onSuccess: () => reset(),
    });
  };

  return (
    <section className="p-4 md:p-6">
      <div className="max-w-2xl border border-[#2A2A2A] rounded-lg mx-auto mb-20 md:mb-8">
        <div className="bg-[#13171E] px-[20px] py-[10px] rounded-tl-lg rounded-tr-lg">
          <h2 className="text-xl text-white font-semibold">Withdraw USDT</h2>
          <small className="text-[#E6E6E7]">
            Transfer your USDT to another wallet
          </small>
        </div>

        {/* 🧾 Withdraw Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <Input
            label="Recipient Address (BEP20)"
            placeholder="Enter Recipient Address"
            {...register("address")}
            error={errors.address?.message}
          />

          <Input
            label="Amount (USDT)"
            type="number"
            step="any"
            placeholder="Enter Amount"
            {...register("amount")}
            error={errors.amount?.message}
          />

          <Input
            label="Transaction Note (Optional)"
            placeholder="Enter a Short Note"
            {...register("note")}
            error={errors.note?.message}
          />

          {/* ℹ️ Transaction Info */}
          <div className="space-y-4">
            <div className="bg-[#13171E] px-[20px] py-[10px] rounded-lg">
              <div className="flex gap-2 items-center">
                <span className="mgc_alert_line text-[#FFC200]"></span>
                <h3 className="text-md text-white font-semibold">
                  Transaction Fee
                </h3>
              </div>
              <small className="text-[#E6E6E7] pt-0">
                Transaction charge: {stats?.withdrawCharge}% (Minimum{" "}
                {stats?.minimumWithdraw} USDT)
              </small>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting || withdrawMutation.isPending}
            className="w-full"
          >
            <span className="mgc_external_link_line me-2 text-[20px]"></span>
            Send Withdraw
          </Button>
        </form>
      </div>
    </section>
  );
}
