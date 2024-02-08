import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserProfile from "@/components/UserProfile";

const Profile = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="px-[6%]">
      Profile
      <UserProfile />
    </div>
  );
};

export default Profile;
