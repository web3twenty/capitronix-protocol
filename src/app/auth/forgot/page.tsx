"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const forgotPasswordMutation = useMutation<
    ForgotPasswordResponse,
    AxiosError,
    ForgotPasswordFormData
  >({
    mutationFn: (data) =>
      api.post("/auth/forgot-password", data).then((res) => res.data),
    onSuccess: (response) => {
      toast(response.message, { type: "success" });
      router.replace("/login");
    },
    onError: (error: any) => {
      toast(error.response?.data?.message || error.message, { type: "error" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPasswordMutation.mutate({ email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#03070D] px-4">
      <div className="w-full max-w-md bg-[#13171E] border border-[#2A2A2A] rounded-lg p-8 pt-2">
        <Image
          src="/icon-300x100.png"
          alt="Logo"
          width={300}
          height={100}
          className="w-50 mx-auto"
        />
        <div className="text-center text-gray-400">
          Enter your email to reset your password
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <Input
            label="Email Address"
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={forgotPasswordMutation.isPending}
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
