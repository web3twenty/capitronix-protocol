"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Cookies from "js-cookie";
import Link from "next/link";
import Button from "@/components/ui/Button";

type NavigationItem = {
  name: string;
  href?: string;
  icon: string;
  children?: { name: string; href: string }[];
};

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
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

  const { data: account } = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const response = await api.get("/account");
      return response.data.payload.account;
    },
  });

  return (
    <div className="h-screen flex bg-[#03070D] overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#13171E] text-gray-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="items-center justify-center hidden md:flex h-[85px] border-b border-r border-[#2A2A2A] flex-shrink-0">
          <Image
            src="/icon-300x100.png"
            alt="Logo"
            width={150}
            height={85}
            className="w-32"
          />
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
                        <a
                          key={child.name}
                          href={child.href}
                          className={`block px-3 py-2 rounded-md font-medium relative ${
                            pathname === child.href
                              ? "text-[#FFC200]"
                              : "text-[#CFD0D2] hover:text-[#FFC200]"
                          }`}
                        >
                          <span>{child.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <a
                key={item.name}
                href={item.href}
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
              </a>
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
      <div className="flex-1 flex flex-col overflow-hidden bg-[#03070D]">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-30 flex items-center h-[68px] md:h-[85px] border-b border-[#2A2A2A] bg-[#13171E] px-2">
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
              />
            </Link>
          </div>

          {account?.isVerified === 0 && (
            <div className="hidden lg:block">
              <Button className="h-8 rounded me-3" variant="secondary">
                Activate Now
              </Button>
            </div>
          )}

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <div className="flex items-center gap-3 p-0.5 border border-[#2A2A2A] rounded-lg hover:bg-[#2A2A2A] cursor-pointer max-w-[200px] md:max-w-[350px] min-w-0">
                <Image
                  src="/default-avatar.png"
                  alt="Image"
                  width={34}
                  height={34}
                  className="flex-shrink-0"
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
                  Cookies.remove("accessToken");
                  router.replace("/auth/login");
                }}
              >
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-[#03070D] pt-[68px] md:pt-[85px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 md:p-6 gap-4">
            {/* Greeting */}
            <h1 className="text-2xl text-white font-semibold text-left w-full md:w-auto">
              Hy There, {account?.name || "..."}
            </h1>

            {/* Buttons grid */}
            <div className="grid grid-cols-4 gap-3 w-full md:w-auto">
              <button
                onClick={() => router.push("/dashboard/deposit")}
                className="flex text-[#121213] cursor-pointer flex-col md:flex-row items-center justify-center bg-[#25262A] hover:bg-[#3a3a3f] transition-colors duration-200 p-3 rounded gap-2"
              >
                <i className="mgc_cash_2_line text-[20px] bg-[#FFC200] rounded-full w-8 h-8 flex items-center justify-center"></i>
                <span className="text-white text-sm text-center">Deposit</span>
              </button>

              <button className="flex text-[#121213] cursor-pointer flex-col md:flex-row items-center justify-center bg-[#25262A] hover:bg-[#3a3a3f] transition-colors duration-200 p-3 rounded gap-2">
                <i className="mgc_card_pay_line text-[20px] bg-[#FFC200] rounded-full w-8 h-8 flex items-center justify-center"></i>
                <span className="text-white text-sm text-center">Withdraw</span>
              </button>

              <button className="flex text-[#121213] cursor-pointer flex-col md:flex-row items-center justify-center bg-[#25262A] hover:bg-[#3a3a3f] transition-colors duration-200 p-3 rounded gap-2">
                <i className="mgc_coin_3_line text-[20px] bg-[#FFC200] rounded-full w-8 h-8 flex items-center justify-center"></i>
                <span className="text-white text-sm text-center">Tokens</span>
              </button>

              <button className="flex text-[#121213] cursor-pointer flex-col md:flex-row items-center justify-center bg-[#25262A] hover:bg-[#3a3a3f] transition-colors duration-200 p-3 rounded gap-2">
                <i className="mgc_coin_2_line text-[20px] bg-[#FFC200] rounded-full w-8 h-8 flex items-center justify-center"></i>
                <span className="text-white text-sm text-center">Staking</span>
              </button>
            </div>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
