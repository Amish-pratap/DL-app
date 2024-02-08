"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import fallbackuser from "../../public/icons/fallbackuser.svg";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    email: "",
    phoneNo: "",
    image: "",
  });
  const { data: session } = useSession();
  const email = session?.user?.email;
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/userinfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUserInfo(data.userInfo);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [email]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/userinfo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to update user information");
      }

      console.log("User information updated successfully");
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  if (userInfo.name === "") {
    return <div>Loading...</div>;
  }

  return (
    <form className="" onSubmit={handleSubmit}>
      {userInfo.image.startsWith("http") ? (
        <Image
          src={userInfo.image || fallbackuser}
          alt="user image"
          width={200}
          height={200}
        />
      ) : (
        <Image
          src={`data:image/jpeg;base64,${userInfo.image}` || fallbackuser}
          alt="user image"
          width={200}
          height={200}
        />
      )}

      <label>email</label>
      <h1>{email}</h1>
      <label>name</label>
      <input
        type="text"
        value={userInfo.name}
        name="name"
        onChange={handleInputChange}
        className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
        placeholder="Name"
        required
      />
      <label>address</label>
      <input
        type="text"
        name="address"
        value={userInfo.address}
        onChange={handleInputChange}
        className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
        placeholder="Email"
        required
      />
      <label>Phone No</label>
      <input
        type="tel"
        name="phoneNo"
        value={userInfo.phoneNo}
        onChange={handleInputChange}
        placeholder="Mobile No"
        className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
        required
      />

      <button type="submit" className="bg-[#0bd42c] p-1 rounded-md">
        Save Changes
      </button>

      {/* Render other user details here */}
    </form>
  );
};

export default UserProfile;
