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
  firstName: z
    .string()
    .min(3, { message: "First name must be at least 3 characters" })
    .max(25, { message: "First name must be at most 25 characters" }),
  lastName: z
    .string()
    .max(25, { message: "Last name must be at most 25 characters" })
    .optional(),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, { message: "Invalid Bangladesh phone number" }),
  dob: z.string().min(1, { message: "Date of Birth is required" }),
  address: z.string().optional(),
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
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get("/user/profile").then((res) => res.data),
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
    if (profile) {
      setValue("firstName", profile.firstName || "");
      setValue("lastName", profile.lastName || "");
      setValue("phone", profile.phone || "");
      setValue(
        "dob",
        profile.dob ? new Date(profile.dob).toISOString().slice(0, 10) : "",
      );
      setValue("address", profile.address || "");
    }
  }, [profile, setValue]);

  // Mutation to update profile
  const updateMutation = useMutation<
    { message: string },
    AxiosError<{ message: string }>,
    ProfileFormData
  >({
    mutationFn: (data) => api.put("/user/profile", data),
    onSuccess: () => {
      showSuccessAlert("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      showErrorAlert(error.response?.data?.message.toString() || error.message);
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
      //return the API call so mutation can resolve it
      return await showPromiseToast(
        api.patch("/user/profile/image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      showSuccessAlert("Profile image updated successfully");
      setIsUploading(false);
    },
    onError: (error) => {
      showErrorAlert(error.response?.data?.message.toString() || error.message);
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

      const imageFile = new File([resizedImage], file.name || "image.jpg", {
        type: "image/jpeg",
      });

      const formData = new FormData();
      formData.append("image", imageFile);

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
              src={profile?.profileImage || "/default-avatar.png"}
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
            label="First Name"
            placeholder="Enter your first name"
            {...register("firstName")}
            error={errors.firstName?.message}
          />

          <Input
            label="Last Name"
            placeholder="Enter your family name"
            {...register("lastName")}
            error={errors.lastName?.message}
          />

          <div>
            <Input
              label="Email"
              value={profile?.email || ""}
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
            {...register("address")}
            error={errors.address?.message}
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
