"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { showSuccessAlert, showErrorAlert } from "@/components/Toast";

// Zod schema
const profileSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, { message: "Invalid Bangladesh phone number" }),
  dob: z.string().min(1, { message: "Date of Birth is required" }),
  location: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const queryClient = useQueryClient();

  // Fetch account data
  const { data: account, isLoading } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const response = await api.get("/account");
      return response.data.payload.account;
    },
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  // Prefill form when account loads
  useEffect(() => {
    if (account) {
      setValue("name", account.name || "");
      setValue("phone", account.phone || "");
      setValue(
        "dob",
        account.dob ? new Date(account.dob).toISOString().slice(0, 10) : ""
      );
      setValue("location", account.location || "");
    }
  }, [account, setValue]);

  // Mutation to update profile
  const updateMutation = useMutation<
    { message: string },
    AxiosError<{ message: string }>,
    ProfileFormData
  >({
    mutationFn: (data) => api.put("/account", data).then((res) => res.data),
    onSuccess: (data) => {
      showSuccessAlert(data.message);
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
    onError: (error) => {
      showErrorAlert(error.response?.data?.message || error.message);
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-[#0F121A] text-white p-4 md:px-6">
      <div className="max-w-3xl mx-auto bg-[#13171E] border border-[#2A2A2A] rounded-lg p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Enter your name"
            {...register("name")}
            error={errors.name?.message}
          />

          <div>
            <Input
              label="Email"
              value={account?.email || ""}
              placeholder="Email"
              readOnly
              disabled
            />
            <p className="text-[#CFD0D2] text-[12px] pt-2">
              Email is not changable.
            </p>
          </div>

          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            {...register("phone")}
            error={errors.phone?.message}
          />

          <Input
            label="Date of Birth"
            type="date"
            {...register("dob")}
            error={errors.dob?.message}
          />

          <Input
            label="Address"
            placeholder="Enter your address"
            {...register("location")}
            error={errors.location?.message}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={isSubmitting || updateMutation.isPending}
          >
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
}
