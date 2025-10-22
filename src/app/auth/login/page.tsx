"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

// 1️⃣ Zod schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

// 2️⃣ TypeScript type inferred from schema
type LoginFormData = z.infer<typeof loginSchema>;

interface LoginResponse {
  success: boolean;
  message: string;
  payload: {
    accessToken: string;
  };
}

export default function LoginForm() {
  const router = useRouter();

  // 3️⃣ React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // 4️⃣ Mutation for API call
  const loginMutation = useMutation<
    LoginResponse,
    AxiosError<{ message: string }>,
    LoginFormData
  >({
    mutationFn: (formData) =>
      api.post("/auth/login", formData).then((res) => res.data),
    onSuccess: (response) => {
      toast(response.message, { type: "success" });
      Cookies.set("accessToken", response.payload.accessToken, { expires: 30 });
      router.replace("/dashboard");
    },
    onError: (error) => {
      toast(error.response?.data?.message || error.message, { type: "error" });
    },
  });

  // 5️⃣ Form submit handler
  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
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
          Enter your credentials to access your account
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
          <Input
            label="Email Address"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            error={errors.email?.message}
          />

          <div>
            <Input
              label="Password"
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              error={errors.password?.message}
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
            loading={isSubmitting || loginMutation.isPending}
            className="w-full"
          >
            Login
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          {`Don't`} have an account?{" "}
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
