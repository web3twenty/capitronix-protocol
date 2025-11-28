"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/api";

const VerifyEmail = () => {
  const { token } = useParams();
  const router = useRouter();

  const { mutate, data, error, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post(`/auth/verify-email/${token}`);
      return res.data;
    },
    onSuccess: () => {
      // redirect after a short delay to show success
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    },
  });

  useEffect(() => {
    if (token) {
      mutate();
    }
  }, [token, mutate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-secondary/30 backdrop-blur-md">
      <div className="bg-white/10 border border-white/20 p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        {isPending && (
          <p className="text-brand-primary text-lg">Verifying email...</p>
        )}

        {error && (
          <p className="text-red-500 font-medium">
            Error verifying email. Please try again.
          </p>
        )}

        {!isPending && !error && (
          <p className="text-green-500 font-medium">
            {data?.message || "Email verified successfully! Redirecting..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
