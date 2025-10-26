"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import Modal from "react-responsive-modal";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AxiosError } from "axios";
import { showSuccessAlert, showErrorAlert } from "@/components/Toast";

// Number formatting function
function formatNumber(value: number): string {
  if (value < 1000) return value.toString();

  const suffixes = ["", "K", "M", "B", "T"];
  const tier = Math.floor(Math.log10(value) / 3);

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = value / scale;

  const formatted = scaled % 1 === 0 ? scaled.toFixed(0) : scaled.toFixed(1);

  return `${formatted}${suffix}`;
}

// 1️⃣ Update Zod schema to include terms checkbox
const founderSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  mobileNumber: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^(?:\+8801|01)[3-9][0-9]{8}$/, "Invalid Bangladesh mobile number"),
  fathersName: z.string().min(1, "Father's name is required"),
  nidPassportNumber: z.string().min(1, "NID/Passport is required"),
  documentFile: z
    .any()
    .refine((file) => file?.length > 0, "Document file is required"),
  acceptedTerms: z
    .boolean()
    .refine((val) => val === true, "You must accept the Terms & Conditions"),
});

type FounderFormData = z.infer<typeof founderSchema>;

export default function FounderPool() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Fetch stats for display
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await api.get("/dashboard/stats");
      return response.data.payload;
    },
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FounderFormData>({
    resolver: zodResolver(founderSchema),
  });

  // Mutation for founder registration
  const mutation = useMutation<
    { success: boolean; message: string },
    AxiosError<{ message: string }>,
    FounderFormData
  >({
    mutationFn: (data: FounderFormData) => {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("mobileNumber", data.mobileNumber);
      formData.append("fathersName", data.fathersName);
      formData.append("nidPassportNumber", data.nidPassportNumber);
      formData.append("documentFile", data.documentFile[0]);

      return api.post("/founder-pool/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: (response) => {
      showSuccessAlert(response.message);
      setIsModalOpen(false);
      reset();
    },
    onError: (error) => {
      showErrorAlert(error.response?.data?.message || error.message);
    },
  });

  const totalSeat = stats?.FOUNDER_DETAILS?.totalSeat;
  const minimumInvestment = stats?.FOUNDER_DETAILS?.minimumInvestment;
  const tokenPrice = stats?.TOKEN_PRICE;

  return (
    <section className="p-4 md:px-6 md:py-2">
      <div className="max-w-6xl mx-auto space-y-8 pb-5">
        {/* Founder Pool Info */}
        <div className="bg-[#25262A] rounded-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="space-y-3 me-auto col-span-2 p-5">
              <span className="px-2 py-1 inline-block text-xs rounded-full bg-yellow-500/20 text-yellow-400">
                Exclusive Investment Opportunity
              </span>
              <div className="max-w-lg space-y-3">
                <h1 className="text-3xl font-medium text-white">
                  Join the 3Twenty Founder Pool
                </h1>
                <p className="text-base text-white">
                  Become a founding member and earn exclusive profits from our{" "}
                  <span className="text-[#FFC200]">
                    Centralized Exchange (CEX)
                  </span>{" "}
                  revenue sharing program.
                </p>
              </div>
            </div>
            <div className="p-5 flex justify-center lg:justify-end">
              <Image
                src="/founder-vector.png"
                alt="Founder"
                width={250}
                height={200}
              />
            </div>
          </div>
        </div>

        {/* Founder Investment Package */}
        <div className="border border-[#2A2A2A] rounded-lg max-w-xl mx-auto">
          <div className="bg-[#13171E] px-4 py-3 md:px-5 md:py-4 rounded-t-lg">
            <h3 className="text-md md:text-lg text-white font-semibold">
              Founder Investment Package
            </h3>
          </div>

          <div className="text-center p-5">
            <h3 className="text-5xl text-[#FFC200] font-bold">
              ${minimumInvestment || ""}
            </h3>
            <small className="text-sm text-white">Minimum Investment</small>
            <p className="text-lg font-medium text-[#FD5454] mt-3">
              Limited to {totalSeat || ""} Founders Only
            </p>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <div className="divide-y divide-[#2A2A2A]">
              {[
                {
                  icon: "mgc_door_line",
                  label: "Entry Cost:",
                  value: `$${minimumInvestment || ""}`,
                  highlight: true,
                },
                {
                  icon: "mgc_calendar_line",
                  label: "Tokens Allocated:",
                  value: `${
                    Number(
                      Number(minimumInvestment || 0) / Number(tokenPrice || 0)
                    ).toFixed(2) || ""
                  } 3TWENTY`,
                  highlight: true,
                },
                {
                  icon: "mgc_trending_up_line",
                  label: "CEX Revenue Share:",
                  value: "5% monthly",
                  highlight: true,
                },
                {
                  icon: "mgc_user_follow_2_line",
                  label: "Total Pool Size:",
                  value: `${totalSeat || ""} Founders`,
                  highlight: true,
                },
                {
                  icon: "mgc_user_follow_2_line",
                  label: "Total Pool Allocation:",
                  value: `${formatNumber(
                    Number(
                      Number(minimumInvestment || 0) / Number(tokenPrice || 0)
                    ) * totalSeat
                  )} 3TWENTY`,
                  highlight: true,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-3 md:py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    {idx === 1 || idx === 4 ? (
                      <Image
                        src="/3twenty-coin.png"
                        alt="Coin"
                        width={18}
                        height={18}
                      />
                    ) : (
                      <span
                        className={`${item.icon} text-[#FFC200] text-lg md:text-[20px]`}
                      ></span>
                    )}
                    <span className="text-[#CFD0D2] text-[12px] md:text-sm">
                      {item.label}
                    </span>
                  </div>
                  <p
                    className={`font-medium text-sm md:text-md ${
                      item.highlight ? "text-white" : ""
                    }`}
                  >
                    {item.value.split(" ")[0]}{" "}
                    <span className="text-[#FFC200]">
                      {item.value.split(" ")[1]}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            {/* Projected Returns */}
            <div className="bg-[#13171E] px-3 py-2 md:px-4 md:py-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="mgc_fullscreen_exit_2_line text-[#FFC200] text-lg md:text-[20px]"></span>
                <h4 className="text-white font-semibold text-sm md:text-md">
                  Projected Returns
                </h4>
              </div>
              <p className="text-[#E6E6E7] text-[11px] md:text-[12px] mt-1 leading-tight">
                Based on conservative CEX trading volume estimates, founders
                could earn $200-500+ monthly from revenue sharing alone.
              </p>
              <div className="flex bg-[#03070D] rounded mt-2 items-center justify-between p-2">
                <div className="flex items-center gap-2">
                  <span className="mgc_calendar_line text-[#FFC200] text-lg"></span>
                  <span className="text-[#CFD0D2] text-sm">ROI</span>
                </div>
                <p className="text-[#FFC200] text-[14px]">24-60% annually</p>
              </div>
            </div>

            <Button
              type="button"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="mgc_user_follow_2_line me-2 text-[20px]"></span>
              Join Founder Pool
            </Button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        center
        styles={{
          modal: {
            borderRadius: "8px",
            backgroundColor: "#03070D",
            padding: 0,
          },
          overlay: { backgroundColor: "#4A4A4AC2" },
        }}
        closeIcon={
          <span className="mgc_close_line text-white text-[20px]"></span>
        }
      >
        <div className="bg-[#13171E] px-4 py-3 rounded-t-lg">
          <h2 className="text-xl text-white font-semibold">
            Founder Registration
          </h2>
          <small className="text-[#E6E6E7]">
            Fill out your details to join the founder pool
          </small>
        </div>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="bg-[#03070D] p-6 space-y-4"
        >
          <Input
            label="Full Name"
            placeholder="Enter full name"
            {...register("fullName")}
            error={errors.fullName?.message}
          />
          <Input
            label="Mobile Number"
            placeholder="Enter mobile number"
            {...register("mobileNumber")}
            error={errors.mobileNumber?.message}
          />
          <Input
            label="Father's Name"
            placeholder="Enter father's name"
            {...register("fathersName")}
            error={errors.fathersName?.message}
          />
          <Input
            label="NID / Passport Number"
            placeholder="Enter NID or Passport"
            {...register("nidPassportNumber")}
            error={errors.nidPassportNumber?.message}
          />

          {/* ✅ Styled File Input with filename */}
          <div className="flex flex-col">
            <label className="block text-white mb-1">Document File</label>
            <label
              htmlFor="documentFile"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6 cursor-pointer hover:border-yellow-500 transition-colors"
            >
              <span className="text-yellow-400 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="lucide lucide-file-text w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 2v6h6"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 13H8"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 17H8"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 9h4"
                  />
                </svg>
              </span>

              {/* Show filename if file selected */}
              {watch("documentFile") && watch("documentFile").length > 0 ? (
                <span className="text-white text-sm">
                  {watch("documentFile")[0].name}
                </span>
              ) : (
                <span className="text-gray-400 text-sm">
                  Click to upload document image
                </span>
              )}

              <input
                id="documentFile"
                type="file"
                accept=".jpg"
                className="hidden"
                {...register("documentFile")}
              />
            </label>
            {errors.documentFile && (
              <p className="text-red-500 text-sm mt-1"></p>
            )}
          </div>

          {/* ✅ Terms & Conditions Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              {...register("acceptedTerms")}
              className="w-4 h-4 text-yellow-500 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
            />
            <label htmlFor="terms" className="text-sm text-white">
              Did you read Terms and Conditions? If not please read{" "}
              <a
                href="/terms-and-conditions"
                target="_blank"
                className="text-[#FFC200] underline"
              >
                Terms & Conditions
              </a>
            </label>
          </div>
          {errors.acceptedTerms && (
            <p className="text-red-500 text-sm">
              {errors.acceptedTerms.message}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting || mutation.isPending}
            className="w-full"
          >
            Submit Registration
          </Button>
        </form>
      </Modal>
    </section>
  );
}
