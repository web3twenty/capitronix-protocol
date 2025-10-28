"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { showSuccessAlert, showErrorAlert } from "@/components/Toast";

// Zod schema
const signupSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Confirm your password" }),
    referralCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupResponse {
  success: boolean;
  message: string;
  payload: {
    accessToken: string;
  };
}

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refParam = searchParams.get("ref"); // 👈 get ?ref= value

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // Automatically fill referral code if exists
  useEffect(() => {
    if (refParam) {
      setValue("referralCode", refParam);
    }
  }, [refParam, setValue]);

  const signupMutation = useMutation<
    SignupResponse,
    AxiosError<{ message: string }>,
    SignupFormData
  >({
    mutationFn: (formData) =>
      api
        .post("/auth/register", formData, { withCredentials: true })
        .then((res) => res.data),
    onSuccess: (response) => {
      showSuccessAlert(response.message);
      Cookies.set("accessToken", response.payload.accessToken, { expires: 30 });
      router.replace("/dashboard");
    },
    onError: (error) => {
      showErrorAlert(error.response?.data?.message || error.message);
    },
  });

  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#03070D] px-4 py-10">
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
            {...register("referralCode")}
            error={errors.referralCode?.message}
            readOnly={!!refParam} // 👈 Make readonly if ?ref exists
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
