"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Modal from "react-responsive-modal";

export default function TokenPurchase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<PurchaseFormData | null>(null);
  const queryClient = useQueryClient();

  // ✅ Fetch stats for min purchase / fees
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await api.get("/dashboard/stats");
      return response.data.payload;
    },
  });

  // ✅ Validation schema (amount only)
  const purchaseSchema = z.object({
    amount: z
      .string()
      .min(1, { message: "Amount is required" })
      .refine(
        (val) =>
          !isNaN(parseFloat(val)) &&
          parseFloat(val) >= (stats?.minimumBuyToken || 0),
        {
          message: `Minimum purchase is ${stats?.minimumBuyToken || 0} USDT`,
        }
      ),
  });

  type PurchaseFormData = z.infer<typeof purchaseSchema>;

  interface PurchaseResponse {
    success: boolean;
    message: string;
  }

  const purchaseMutation = useMutation<
    PurchaseResponse,
    AxiosError<{ message: string }>,
    PurchaseFormData
  >({
    mutationFn: (formData) =>
      api
        .post("/tokens/buy", { amount: formData.amount })
        .then((res) => res.data),
    onSuccess: (response) => {
      reset();
      toast(response.message, { type: "success" });
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
    onError: (error) => {
      toast(error.response?.data?.message || error.message, { type: "error" });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseSchema), // TS workaround
  });

  const onSubmit = (data: PurchaseFormData) => {
    setIsModalOpen(true);
    setFormData(data);
  };

  const amountValue = watch("amount") || 0;

  const closeIcon = (
    <span className="mgc_close_line text-white text-[20px]"></span>
  );

  return (
    <section className="p-4 md:px-6 md:py-2">
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        center
        styles={{
          modal: {
            borderRadius: "8px",
            backgroundColor: "#03070D",
            padding: 0,
          },
          overlay: {
            backgroundColor: "#4A4A4AC2",
          },
        }}
        closeIcon={closeIcon}
      >
        <div className="bg-[#13171E] px-[20px] py-[10px] rounded-tl-lg rounded-tr-lg">
          <h2 className="text-xl text-white font-semibold">
            Confirm Token Purchase
          </h2>
          <small className="text-[#E6E6E7]">
            Review your purchase details before confirming
          </small>
        </div>

        <div className="bg-[#03070D] p-4">
          <div className="flex items-center border border-[#13171E] rounded p-2 justify-between">
            <p className="text-[#CFD0D2] text-sm">Amount:</p>
            <p className="font-medium text-[#FFC200]">{amountValue} USDT</p>
          </div>

          <div className="flex items-center border border-[#13171E] rounded p-2 justify-between">
            <p className="text-[#CFD0D2] text-sm">Tokens:</p>
            <p className="font-medium text-[#FFC200]">
              <span className="text-white">
                {Number(amountValue ?? 0) / stats?.TOKEN_PRICE}
              </span>{" "}
              3TWENTY
            </p>
          </div>

          <div className="flex items-center border border-[#13171E] rounded p-2 justify-between">
            <p className="text-[#CFD0D2] text-sm">Price:</p>
            <p className="font-medium text-[#FFC200]">
              ${stats?.TOKEN_PRICE} per token
            </p>
          </div>
        </div>

        <div className="p-4">
          <Button
            type="button"
            variant="primary"
            size="lg"
            loading={isSubmitting || purchaseMutation.isPending}
            className="w-full"
            onClick={() => {
              if (!formData) return;
              purchaseMutation.mutate(formData);
            }}
          >
            Confirm Purchase
          </Button>
        </div>
      </Modal>

      <div className="max-w-2xl border border-[#2A2A2A] rounded-lg mx-auto mb-8">
        <div className="bg-[#13171E] px-[20px] py-[10px] rounded-tl-lg rounded-tr-lg">
          <h2 className="text-xl text-white font-semibold">Token Purchase</h2>
          <small className="text-[#E6E6E7]">
            Calculate and purchase 3TWENTY tokens
          </small>
        </div>

        {/* 🧾 Purchase Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <Input
            label="Amount (USDT)"
            type="number"
            step="any"
            placeholder="Enter amount"
            {...register("amount")}
            error={errors.amount?.message}
          />

          <Input
            label="Currency"
            placeholder="USDT"
            defaultValue="USDT"
            readOnly
          />

          {/* ℹ️ Transaction Info */}
          <div className="space-y-4">
            <div className="bg-[#13171E] px-[20px] py-[10px] rounded-lg">
              <div className="flex gap-2 items-center">
                <small className="text-md text-[#E6E6E7]">
                  You will receive:
                </small>
              </div>
              <div className="text-xl pt-1 font-medium">
                <span className="text-white">
                  {stats?.TOKEN_PRICE
                    ? Number(amountValue || 0) / stats.TOKEN_PRICE
                    : "0"}
                </span>{" "}
                <span className="text-[#FFC200]">3TWENTY</span>
              </div>
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Purchase Tokens
          </Button>
        </form>
      </div>
    </section>
  );
}
