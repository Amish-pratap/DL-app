import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserProfile from "@/components/UserProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Driver's Licence Application - Profile",
  description:
    "View and update your Driver's License Application profile. Keep your information up-to-date, track your progress, and manage your driving journey effortlessly.",
};

const Profile = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="p-[6%]">
      <h1 className="flex w-full text-xl p-3 font-bold justify-center">
        User Profile
      </h1>
      <UserProfile />
    </div>
  );
};

export default Profile;
