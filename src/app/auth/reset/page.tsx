"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
  token: string;
}

interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: "",
    confirmPassword: "",
    token,
  });

  useEffect(() => {
    // Update token in state if URL changes
    setFormData((prev) => ({ ...prev, token }));
  }, [token]);

  const resetPasswordMutation = useMutation<
    ResetPasswordResponse,
    AxiosError<{ message: string }>,
    ResetPasswordFormData
  >({
    mutationFn: (data) =>
      api.post("/auth/reset-password", data).then((res) => res.data),
    onSuccess: (response) => {
      toast(response.message, { type: "success" });
      router.replace("/auth/login");
    },
    onError: (error) => {
      toast(error.response?.data?.message || error.message, { type: "error" });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast("Passwords do not match", { type: "error" });
      return;
    }
    if (!formData.token) {
      toast("Invalid or missing token", { type: "error" });
      return;
    }
    resetPasswordMutation.mutate(formData);
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
        <div className="text-center text-gray-400">Enter your new password</div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <Input
            label="New Password"
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={resetPasswordMutation.isPending}
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
