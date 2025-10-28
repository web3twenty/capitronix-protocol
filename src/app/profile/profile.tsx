"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { showSuccessAlert, showErrorAlert } from "@/components/Toast";
import Image from "next/image";
import { Camera } from "lucide-react";
import { showPromiseToast } from "@/components/Toast";

// Zod schema
const profileSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, { message: "Invalid Bangladesh phone number" }),
  dob: z.string().min(1, { message: "Date of Birth is required" }),
  location: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfilePicResponse {
  success: boolean;
  message: string;
}

export default function ProfileForm() {
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);

  // Fetch account data
  const { data: account, isLoading } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const response = await api.get("/account");
      return response.data.payload.account;
    },
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  // Prefill form when account loads
  useEffect(() => {
    if (account) {
      setValue("name", account.name || "");
      setValue("phone", account.phone || "");
      setValue(
        "dob",
        account.dob ? new Date(account.dob).toISOString().slice(0, 10) : ""
      );
      setValue("location", account.location || "");
    }
  }, [account, setValue]);

  // Mutation to update profile
  const updateMutation = useMutation<
    { message: string },
    AxiosError<{ message: string }>,
    ProfileFormData
  >({
    mutationFn: (data) => api.put("/account", data).then((res) => res.data),
    onSuccess: (data) => {
      showSuccessAlert(data.message);
      queryClient.invalidateQueries({ queryKey: ["account"] });
    },
    onError: (error) => {
      showErrorAlert(error.response?.data?.message || error.message);
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    updateMutation.mutate(data);
  };

  // Upload image mutation
  const { mutate: uploadImage } = useMutation<
    ProfilePicResponse,
    AxiosError<{ message: string }>,
    FormData
  >({
    mutationFn: async (formData: FormData) => {
      // ✅ return the API call so mutation can resolve it
      return await showPromiseToast(
        api
          .put("/account/picture", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => res.data)
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
      showSuccessAlert(
        response?.message || "Profile picture updated successfully!"
      );
      setIsUploading(false);
    },
    onError: (error) => {
      showErrorAlert(error.response?.data?.message || error.message);
      setIsUploading(false);
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const { readAndCompressImage } = await import("browser-image-resizer");
      const config = {
        quality: 0.7,
        maxWidth: 150,
        maxHeight: 150,
        mimeType: "image/jpeg",
      };
      const resizedImage = await readAndCompressImage(file, config);
      const formData = new FormData();
      formData.append("profilePicture", resizedImage);
      uploadImage(formData);
    } catch (err) {
      console.error(err);
      showErrorAlert("Failed to process image.");
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-[#0F121A] text-white p-4 pt-0">
      <div className="max-w-3xl mx-auto bg-[#13171E] border border-[#2A2A2A] rounded-lg p-4 md:p-6 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-24 h-24 rounded-full">
            <Image
              src={account?.profilePicture || "/default-avatar.png"}
              alt="Profile"
              fill
              className="object-cover rounded-full"
            />

            <button className="absolute bottom-0 right-0 bg-transparent">
              <label htmlFor="profile-upload">
                <Camera
                  size={25}
                  className="bg-[#FFC200] rounded-full text-black h-9 w-9 p-2 border-1 border-gray-400 shadow-lg cursor-pointer hover:bg-[#CC9A00]"
                />
              </label>
            </button>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            id="profile-upload"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Enter your name"
            {...register("name")}
            error={errors.name?.message}
          />

          <div>
            <Input
              label="Email"
              value={account?.email || ""}
              placeholder="Email"
              readOnly
              disabled
            />
            <p className="text-[#CFD0D2] text-[12px] pt-2">
              Email is not changable.
            </p>
          </div>

          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            {...register("phone")}
            error={errors.phone?.message}
          />

          <Input
            label="Date of Birth"
            type="date"
            {...register("dob")}
            error={errors.dob?.message}
          />

          <Input
            label="Address"
            placeholder="Enter your address"
            {...register("location")}
            error={errors.location?.message}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={isSubmitting || updateMutation.isPending}
          >
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
}
