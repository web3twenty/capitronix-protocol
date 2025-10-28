"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { showSuccessAlert, showErrorAlert } from "@/components/Toast";

// Zod schema
const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, { message: "Old password is required" }),
    newPassword: z
      .string()
      .min(6, { message: "New password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm your new password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function SecurityForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  // Mutation for updating password
  const passwordMutation = useMutation<
    { message: string },
    AxiosError<{ message: string }>,
    PasswordFormData
  >({
    mutationFn: (data) =>
      api.post("/auth/update-password", data).then((res) => res.data),
    onSuccess: (data) => {
      showSuccessAlert(data.message);
      reset();
    },
    onError: (error) => {
      showErrorAlert(error.response?.data?.message || error.message);
    },
  });

  const onSubmit = (data: PasswordFormData) => {
    passwordMutation.mutate(data);
  };

  return (
    <div className="bg-[#0F121A] text-white p-4 pt-0">
      <div className="max-w-3xl mx-auto bg-[#13171E] border border-[#2A2A2A] rounded-lg p-4 space-y-6">
        <h2 className="text-xl font-semibold mb-4">Update Password</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Old Password"
            type="password"
            placeholder="Enter your old password"
            {...register("oldPassword")}
            error={errors.oldPassword?.message}
          />

          <Input
            label="New Password"
            type="password"
            placeholder="Enter your new password"
            {...register("newPassword")}
            error={errors.newPassword?.message}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your new password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={isSubmitting || passwordMutation.isPending}
          >
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
}
