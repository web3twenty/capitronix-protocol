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
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { showErrorAlert, showSuccessAlert } from "@/components/Toast";

// 1️⃣ Zod schema for email
const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

// 2️⃣ TypeScript type
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export default function ForgotPasswordForm() {
  const router = useRouter();

  // 3️⃣ React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // 4️⃣ Mutation for API call
  const forgotPasswordMutation = useMutation<
    ForgotPasswordResponse,
    AxiosError<{ message: string }>,
    ForgotPasswordFormData
  >({
    mutationFn: (data) => api.post("/auth/forgot-password", data),
    onSuccess: () => {
      showSuccessAlert(
        "Reset password email sent. Please check your inbox or spam folder!",
      );
      router.replace("/auth/login");
    },
    onError: (error) => {
      showErrorAlert(error.response?.data?.message || error.message);
    },
  });

  // 5️⃣ Form submit
  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPasswordMutation.mutate(data);
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

        <div className="text-center text-gray-400">
          Enter your email to reset your password
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            error={errors.email?.message}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting || forgotPasswordMutation.isPending}
            className="w-full"
          >
            Send Reset Link
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
