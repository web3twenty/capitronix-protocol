"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Cookies from "js-cookie";
import Link, { LinkProps } from "next/link";
import Button from "@/components/ui/Button";
import {
  showSuccessAlert,
  showErrorAlert,
  showPromiseToast,
} from "@/components/Toast";
import { AxiosError } from "axios";

type NavigationItem = {
  name: string;
  href: LinkProps["href"];
  icon: string;
  children?: { name: string; href: string }[];
};

interface LayoutProps {
  children: ReactNode;
}

interface VerifyResponse {
  success: boolean;
  message: string;
}

interface LogoutResponse {
  success: boolean;
  message: string;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [isVerificationSent, setIsVerificationSent] = useState<string | null>(
    null
  );
  const pathname = usePathname();
  const router = useRouter();

  const navigation: NavigationItem[] = [
    { name: "Overview", href: "/dashboard", icon: "mgc_open_door_line" },
    { name: "Wallet", href: "/dashboard/wallet", icon: "mgc_wallet_4_line" },
    { name: "Deposit", href: "/dashboard/deposit", icon: "mgc_cash_2_line" },
    {
      name: "Withdraw",
      href: "/dashboard/withdraw",
      icon: "mgc_card_pay_line",
    },
    {
      name: "Buy Tokens",
      href: "/dashboard/buy-tokens",
      icon: "mgc_coin_3_line",
    },
    {
      name: "Transactions",
      href: "/dashboard/transactions",
      icon: "mgc_chart_vertical_line",
    },
    {
      name: "Affiliate",
      href: "/dashboard/affiliate",
      icon: "mgc_user_add_2_line",
    },
    {
      name: "Staking",
      href: "/dashboard/staking",
      icon: "mgc_coin_2_line",
    },
    {
      name: "My Staking",
      href: "/dashboard/my-staking",
      icon: "mgc_user_star_line",
    },
    {
      name: "Founder Pool",
      href: "/dashboard/founder-pool",
      icon: "mgc_user_follow_2_line",
    },
  ];

  const toggleSubmenu = (name: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    navigation.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => child.href === pathname
        );
        if (hasActiveChild) {
          setOpenSubmenus((prev) => ({ ...prev, [item.name]: true }));
        }
      }
    });
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const value = sessionStorage.getItem("isVerificationSent");
      setIsVerificationSent(value);
    }
  }, []);

  const { data: account } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const response = await api.get("/account");
      return response.data.payload.account;
    },
    refetchOnMount: true,
    staleTime: 0,
  });

  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await api.get("/dashboard/stats");
      return response.data.payload;
    },
  });

  const verifyMutation = useMutation<
    VerifyResponse,
    AxiosError<{ message: string }>
  >({
    mutationFn: (formData) =>
      api.post("/auth/resend-verify-email", formData).then((res) => res.data),
    onSuccess: (response) => {
      showSuccessAlert(response.message);
      sessionStorage.setItem("isVerificationSent", "true");
      setIsVerificationSent("true");
    },
    onError: (error) => {
      showErrorAlert(error.response?.data?.message || error.message);
    },
  });

  const activateMutation = useMutation<
    VerifyResponse,
    AxiosError<{ message: string }>
  >({
    mutationFn: (formData) =>
      api.post("/account/activate", formData).then((res) => res.data),
    onSuccess: (response) => {
      showSuccessAlert(response.message);
    },
    onError: (error) => {
      showErrorAlert(error.response?.data?.message || error.message);
    },
  });

  const logoutMutation = useMutation<
    LogoutResponse,
    AxiosError<{ message: string }>
  >({
    mutationFn: () =>
      showPromiseToast(
        api
          .post("/auth/logout", null, { withCredentials: true })
          .then((res) => res.data),
        "Logging out..."
      ),
    onSuccess: (response) => {
      Cookies.remove("accessToken");
      router.replace("/auth/login");
    },
    onError: (error) => {
      showErrorAlert(error.response?.data?.message || error.message);
    },
  });

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen flex bg-[#03070D]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#13171E] text-gray-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="items-center justify-center hidden lg:flex h-[85px] border-b border-r border-[#2A2A2A] flex-shrink-0">
          <Link href="/dashboard">
            <Image
              src="/icon-300x100.png"
              alt="Logo"
              width={150}
              height={85}
              className="w-32"
            />
          </Link>
        </div>

        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 cursor-pointer lg:hidden p-2 rounded-md text-white hover:text-[#FFC200]"
        >
          <span className="mgc_close_line text-[24px]"></span>
        </button>

        {/* Scrollable Nav */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            if (item.children) {
              const isOpen = openSubmenus[item.name];

              return (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className="group flex items-center w-full px-3 py-2.5 font-medium rounded-md text-[#CFD0D2] hover:text-[#FFC200]"
                  >
                    <span
                      className={`mr-3 h-5 w-5 ${
                        isOpen
                          ? "text-[#FFC200]"
                          : "text-[#CFD0D2] group-hover:text-[#FFC200]"
                      }`}
                    >
                      <span className={`${item.icon} text-[20px]`}></span>
                    </span>
                    <span className="flex-1 text-left">{item.name}</span>
                    <span
                      className={`transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#FFC200]" : "text-[#CFD0D2]"
                      }`}
                    >
                      <i className="mgc_down_line text-[20px]"></i>
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ml-4 space-y-1 ${
                      isOpen ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="border-l border-gray-600 pl-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`block px-3 py-2 rounded-md font-medium relative ${
                            pathname === child.href
                              ? "text-[#FFC200]"
                              : "text-[#CFD0D2] hover:text-[#FFC200]"
                          }`}
                        >
                          <span>{child.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center px-3 py-2.5 font-medium rounded-md ${
                  isActive
                    ? "text-[#FFC200]"
                    : "text-[#CFD0D2] hover:text-[#FFC200]"
                }`}
              >
                <span
                  className={`mr-3 h-5 w-5 ${
                    isActive
                      ? "text-[#FFC200]"
                      : "text-[#CFD0D2] group-hover:text-[#FFC200]"
                  }`}
                >
                  <span className={`${item.icon} text-[20px]`}></span>
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main area */}
      <main className="flex-1 bg-[#03070D] lg:pl-64 transition-all duration-300">
        {/* Fixed Header */}

        {/* Content */}
        <header className="flex items-center h-[68px] md:h-[85px] border-b border-[#2A2A2A] bg-[#13171E] px-2 sticky top-0 z-30">
          <div className="flex items-center gap-3 me-auto flex-shrink-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md cursor-pointer text-white hover:text-[#FFC200]"
            >
              <span className="mgc_menu_line text-[24px]"></span>
            </button>
            <Link href="/dashboard">
              <Image
                src="/icon-300x100.png"
                alt="Logo"
                width={75}
                height={37}
                className="block lg:hidden"
              />
            </Link>
          </div>

          {account?.isActive === 0 && (
            <div className="hidden lg:block">
              <Button
                className="h-8 me-3"
                roundedClass="rounded"
                variant="secondary"
                onClick={() => activateMutation.mutate()}
                loading={activateMutation.isPending}
              >
                Activate Now
              </Button>
            </div>
          )}

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <div className="flex items-center gap-3 p-0.5 border border-[#2A2A2A] rounded-lg hover:bg-[#2A2A2A] cursor-pointer max-w-[200px] md:max-w-[350px] min-w-0">
                <Image
                  src={account?.profilePicture ?? "/default-avatar.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full object-cover w-10 h-10 border-2 border-brand-accent/30"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] text-white font-semibold truncate">
                    {account?.name || "Loading..."}
                  </p>
                  <p className="text-[10px] text-[#AEAFB2] truncate">
                    {account?.rank || "..."}
                  </p>
                </div>
                <span className="mgc_down_line text-white text-[24px] flex-shrink-0"></span>
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              side="bottom"
              align="end"
              className="bg-[#13171E] border border-[#2A2A2A] rounded-md py-1 mt-2 w-40 shadow-lg"
            >
              <DropdownMenu.Item
                className="px-4 py-2 text-sm text-white focus:outline-none hover:bg-[#2A2A2A] cursor-pointer"
                onClick={() => router.push("/dashboard/profile")}
              >
                My Profile
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="px-4 py-2 text-sm text-red-500 focus:outline-none hover:bg-[#2A2A2A] cursor-pointer"
                onClick={() => {
                  logoutMutation.mutate();
                }}
              >
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </header>

        <div className="p-4 md:p-6 space-y-4">
          {/* Email verification alert */}
          {account?.isVerified === 0 && (
            <div className="rounded-lg bg-[#25262A] p-3 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#DC2626] flex-shrink-0 rounded flex items-center justify-center">
                  <span className="mgc_mail_ai_line text-2xl text-white"></span>
                </div>
                <div className="space-y-1 pe-5">
                  <p className="text-md text-left font-medium leading-4 text-white">
                    Verify Your Email
                  </p>
                  <p className="text-[#AEAFB2] leading-4 text-sm">
                    {`Please verify your email. Didn’t get it? Resend below.`}
                  </p>
                </div>
              </div>
              <Button
                className="h-8 bg-white hover:bg-gray-300"
                roundedClass="rounded"
                onClick={() => verifyMutation.mutate()}
                loading={verifyMutation.isPending}
                disabled={!!isVerificationSent}
              >
                Resend
              </Button>
            </div>
          )}

          {/* Activation card */}
          {account?.isActive === 0 && (
            <div className="flex md:hidden gap-5 flex-col rounded-lg border border-[#11B97E] bg-[#25262A] p-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#11B97E] flex-shrink-0 rounded flex items-center justify-center">
                  <span className="mgc_user_lock_line text-2xl text-white"></span>
                </div>
                <div className="space-y-1 pe-5">
                  <p className="text-md text-left font-medium leading-4 text-white">
                    Account Not Activated
                  </p>
                  <p className="text-[#AEAFB2] leading-4 text-sm">
                    Deposit USDT to activate your account.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg text-[#FFC200] font-medium leading-4">
                    ${stats?.ACTIVATION_USDT || ""}
                  </p>
                  <small className="text-[#AEAFB2]">Minimum Required</small>
                </div>

                <Button
                  className="h-8 me-3"
                  roundedClass="rounded"
                  variant="secondary"
                  onClick={() => activateMutation.mutate()}
                  loading={activateMutation.isPending}
                >
                  Activate Now
                </Button>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Greeting */}
            <h1 className="text-lg text-white font-medium text-left w-full md:w-auto">
              Hy There, {account?.name || "..."}
            </h1>

            {/* Buttons grid */}
            <div className="grid grid-cols-4 gap-3 w-full md:w-auto">
              {[
                {
                  label: "Deposit",
                  icon: "mgc_cash_2_line",
                  path: "/dashboard/deposit",
                },
                {
                  label: "Withdraw",
                  icon: "mgc_card_pay_line",
                  path: "/dashboard/withdraw",
                },
                {
                  label: "Tokens",
                  icon: "mgc_coin_3_line",
                  path: "/dashboard/buy-tokens",
                },
                {
                  label: "Staking",
                  icon: "mgc_coin_2_line",
                  path: "/dashboard/staking",
                },
              ].map(({ label, icon, path }) => (
                <button
                  key={path}
                  onClick={() => router.push(path)}
                  className="flex text-[#121213] cursor-pointer flex-col md:flex-row items-center justify-center bg-[#25262A] hover:bg-[#3a3a3f] transition-colors duration-200 p-3 rounded-lg gap-2"
                >
                  <i
                    className={`${icon} text-[20px] bg-[#FFC200] rounded-full w-8 h-8 flex items-center justify-center`}
                  ></i>
                  <span className="text-white text-sm text-center">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
