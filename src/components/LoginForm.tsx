"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!isValidPassword(password)) {
      setError(
        "Password must contain at least one uppercase and lowercase letter, a number, and a special symbol"
      );
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/dashboard");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex  flex-col items-center justify-between p-[6%]">
        <div className="bg-[#212121] p-8 rounded shadow-md ">
          <h1 className=" sm:text-4xl text-2xl text-center text-white font-semibold mb-8">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              {" "}
              Sign In
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>
          <button
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            onClick={() => {
              signIn("github");
            }}
          >
            Sign In with Github
          </button>
          <div className="text-center text-gray-500 mt-4">- OR -</div>
          <Link
            className="block text-center text-blue-500 hover:underline mt-2"
            href="/signup"
          >
            Register Here
          </Link>
        </div>
      </div>
    )
  );
};

export default LoginForm;
