"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import carlogo from "../../public/logo/carlogo.svg";
import homelogo from "../../public/icons/home.svg";
import downarrow from "../../public/icons/downarrow.svg";
import fallbackimage from "../../public/icons/fallbackuser.svg";

const Navbar = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  if (sessionStatus === "loading") {
    return <div className="h-[40px] sm:h-[80px] bg-black text-white"></div>;
  }

  return (
    <div className="flex justify-between items-center bg-[#29f0ad] h-[40px] sm:h-[80px] text-black px-[6%] text-sm sm:text-xl">
      <div className=" ">
        <Link href="/">
          <Image
            src={homelogo}
            alt="home logo"
            className="w-[32px] h-[32px] sm:w-[64px] sm:h-[64px]"
          />
        </Link>
      </div>
      <div>
        <Link href="/">
          <Image
            src={carlogo}
            alt="car logo"
            className="w-[32px] h-[32px] sm:w-[64px] sm:h-[64px]"
          />
        </Link>
      </div>
      <div className="flex gap-5 ">
        {!session ? (
          <>
            <Link href="/login" className="flex items-center">
              Login
            </Link>
            <Link href="/signup">
              <p className="bg-white sm:p-2 p-1 rounded-md text-[12px] sm:text-[16px]">
                Sign Up
              </p>
            </Link>
          </>
        ) : (
          <>
            <div className="relative cursor-pointer" onClick={toggleDropdown}>
              <div className="bg-[#879c9a] rounded-3xl  sm:w-[100px] w-[50px] sm:h-[60px] h-[30px] flex items-center justify-center ">
                <div className="sm:w-[50px] w-[25px] sm:h-[50px] h-[25px]  rounded-full overflow-hidden bg-white ">
                  {session?.user?.image &&
                  session?.user?.image.startsWith("http") ? (
                    <Image
                      src={session?.user?.image || fallbackimage}
                      alt="user image"
                      width={200}
                      height={200}
                    />
                  ) : (
                    <Image
                      src={
                        `data:image/jpeg;base64,${session?.user?.image}` ||
                        fallbackimage
                      }
                      alt="user image"
                      width={200}
                      height={200}
                    />
                  )}
                </div>
                <Image
                  src={downarrow}
                  width={30}
                  height={30}
                  className="w-[14px] h-[14px] sm:w-[30px] sm:h-[30px]"
                  alt="user profile image"
                />
              </div>
              {dropdownOpen && (
                <div className="absolute top-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white z-10">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      toggleDropdown();
                    }}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-red-100"
                  >
                    Logout
                  </button>
                  {/* Add more dropdown items here */}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
