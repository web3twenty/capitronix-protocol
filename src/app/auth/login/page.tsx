"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const loginMutation = useMutation<LoginResponse, AxiosError, LoginFormData>({
    mutationFn: (formData) =>
      api.post("/auth/login", formData).then((res) => res.data),
    onSuccess: (response) => {
      toast(response.message, { type: "success" });
      Cookies.set("accessToken", response.data.accessToken, { expires: 30 });
      router.replace("/");
    },
    onError: (error: any) => {
      toast(error.response?.data?.message || error.message, { type: "error" });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#03070D] px-4 py-10">
      <div className="w-full max-w-md bg-[#13171E] border border-[#2A2A2A] rounded-lg p-8 pt-2">
        <Image
          src="/icon-300x100.png"
          alt="Logo"
          width={300}
          height={100}
          className="w-50 mx-auto"
        />
        <div className="text-center text-gray-400">
          Enter your credentials to access your account
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
          <Input
            label="Email Address"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <div>
            <Input
              label="Password"
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <div className="text-right mt-1">
              <Link
                href="/auth/forgot"
                className="text-sm text-[#FFC200] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loginMutation.isPending}
            className="w-full"
          >
            Login
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-[#FFC200] hover:underline"
          >
            Signup here
          </Link>
        </div>
      </div>
    </div>
  );
}
