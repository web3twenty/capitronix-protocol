"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";

// 1️⃣ Zod schema
const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Confirm your password" }),
    referCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// 2️⃣ TypeScript type
type SignupFormData = z.infer<typeof signupSchema>;

interface SignupResponse {
  success: boolean;
  message: string;
}

export default function SignupForm() {
  const router = useRouter();

  // 3️⃣ React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // 4️⃣ Mutation
  const signupMutation = useMutation<
    SignupResponse,
    AxiosError<{ message: string }>,
    SignupFormData
  >({
    mutationFn: (formData) =>
      api.post("/auth/signup", formData).then((res) => res.data),
    onSuccess: (response) => {
      toast(response.message, { type: "success" });
      router.replace("/auth/login");
    },
    onError: (error) => {
      toast(error.response?.data?.message || error.message, { type: "error" });
    },
  });

  // 5️⃣ Form submit
  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate(data);
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            {...register("name")}
            error={errors.name?.message}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            error={errors.password?.message}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <Input
            label="Referral Code (Optional)"
            type="text"
            placeholder="Enter referral code"
            {...register("referCode")}
            error={errors.referCode?.message}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting || signupMutation.isPending}
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
