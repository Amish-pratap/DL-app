"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  isValidAddress,
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidPhoneNumber,
} from "@/helpers/helper";

const SignupForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const [base64Image, setBase64Image] = useState("");

  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const name = e.target[2].value;
    const address = e.target[3].value;
    const phoneNo = e.target[4].value;
    const image = e.target[5].files[0];
    console.log(image, "----->image selected");

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

    if (!isValidName(name)) {
      setError("Name must be greater than  3 characters");
      return;
    }
    if (!isValidAddress(address)) {
      setError("address must be greater than  10 characters");
      return;
    }

    if (!isValidPhoneNumber(phoneNo)) {
      setError("Phone number must be 10 digits");
      return;
    }

    try {
      const base64String = (await toBase64(image)) as string;

      const base64Image = base64String.split(",")[1];

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          address,
          phoneNo,
          base64Image,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-[6%]">
      <div className="bg-[#212121] p-8 rounded shadow-md ">
        <h1 className="sm:text-4xl text-2xl text-center text-white font-semibold mb-8">
          Signup
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
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            required
          />
          <input
            type="tel"
            placeholder="Mobile No"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            required
          />
          <input
            type="file"
            accept="image/*"
            className="w-full border text-white border-gray-300  rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link
          className="block text-center text-blue-500 hover:underline mt-2"
          href="/login"
        >
          Login with an existing account
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
