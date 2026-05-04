"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { showSuccessAlert, showErrorAlert } from "@/components/Toast";

// ✅ 1️⃣ Zod schema
const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Confirm your password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ✅ 2️⃣ TypeScript type
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export default function ResetPasswordForm() {
  const params = useParams();
  const token = params.token as string;

  // ✅ 3️⃣ React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  // ✅ 4️⃣ Mutation
  const resetPasswordMutation = useMutation<
    ResetPasswordResponse,
    AxiosError<{ message: string }>,
    ResetPasswordFormData
  >({
    mutationFn: (data) => api.post(`/auth/reset-password/${token}`, data),
    onSuccess: () => {
      showSuccessAlert(
        "Password updated successfully. You can now login with your new password.",
      );
      window.location.href = "/auth/login";
    },
    onError: (error) => {
      showErrorAlert(error.response?.data?.message || error.message);
    },
  });

  // ✅ 5️⃣ Form submit
  const onSubmit = (data: ResetPasswordFormData) => {
    resetPasswordMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#03070D] px-4">
      <div className="w-full max-w-md bg-[#13171E] border border-[#2A2A2A] rounded-lg p-4 md:p-6 pt-2">
        <Link href="/">
          <Image
            src="/icon-300x100.png"
            alt="Logo"
            width={300}
            height={100}
            className="w-40 lg:w-48 h-auto mx-auto"
            priority
          />
        </Link>

        <div className="text-center text-gray-400 mt-2">
          Enter your new password
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
            {...register("newPassword")}
            error={errors.newPassword?.message}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm new password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting || resetPasswordMutation.isPending}
            className="w-full"
          >
            Reset Password
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Remembered your password?{" "}
          <Link href="/auth/login" className="text-[#FFC200] hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
