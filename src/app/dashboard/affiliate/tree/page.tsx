"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Image from "next/image";

interface ReferralUser {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  profilePicture?: string | null;
  totalSales: number;
}

interface ReferralLevel {
  level: number;
  users: ReferralUser[];
}

export default function ReferralUsersPage() {
  // Fetch referral users only
  const {
    data: referralUsers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["referral-users"],
    queryFn: async () => {
      const response = await api.get("/referrals/users");
      return response.data.payload; // Should return [{ level: 1, users: [...] }, ...]
    },
  });

  return (
    <section className="p-4 md:px-6 md:py-4 max-w-7xl mx-auto">
      <h1 className="text-white text-2xl mb-6">6-Level Referral Team</h1>

      {referralUsers.map((levelItem: ReferralLevel) => (
        <div key={levelItem.level} className="mb-8">
          <h2 className="text-yellow-400 mb-3">Tier {levelItem.level}</h2>

          {levelItem.users.length === 0 ? (
            <p className="text-gray-400">No users in this level.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300 bg-[#03070D] divide-y divide-[#2A2A2A] rounded-lg">
                <thead className="bg-[#25262A] text-gray-200">
                  <tr>
                    <th className="px-4 py-2">Profile</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2 text-center">Status</th>
                    <th className="px-4 py-2 text-center">
                      Total Sales (3TWENTY)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A2A]">
                  {levelItem.users.map((user: ReferralUser) => (
                    <tr key={user.id}>
                      <td className="px-4 py-2">
                        <Image
                          src={user.profilePicture || "/default-avatar.png"}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                          width={50}
                          height={50}
                        />
                      </td>
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {user.isActive ? (
                          <span className="text-green-400">Active</span>
                        ) : (
                          <span className="text-yellow-400">Inactive</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {Number(user.totalSales || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
