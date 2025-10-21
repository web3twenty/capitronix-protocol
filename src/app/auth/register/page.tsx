"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  referCode?: string;
}

interface SignupResponse {
  success: boolean;
  message: string;
}

export default function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    referCode: "",
  });
  const router = useRouter();

  const signupMutation = useMutation<
    SignupResponse,
    AxiosError<{ message: string }>,
    SignupFormData
  >({
    mutationFn: (formData) =>
      api.post("/auth/signup", formData).then((res) => res.data),
    onSuccess: (response) => {
      toast(response.message, { type: "success" });
      router.replace("/login");
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
    signupMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#03070D] px-4 py-10">
      <div className="w-full max-w-md bg-[#13171E] border border-[#2A2A2A] rounded-lg p-4 md:p-8 pt-2">
        <Image
          src="/icon-300x100.png"
          alt="Logo"
          width={300}
          height={100}
          className="w-50 mx-auto"
        />
        <div className="text-center text-gray-400">
          Enter your information to create an account
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <Input
            label="Full Name"
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />

          <Input
            label="Referral Code (Optional)"
            type="text"
            name="referCode"
            value={formData.referCode}
            onChange={handleChange}
            placeholder="Enter referral code"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={signupMutation.isPending}
            className="w-full"
          >
            Signup
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#FFC200] hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
