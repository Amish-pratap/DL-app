import SignupForm from "@/components/SignupForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Driver's License Application - Sign Up",
  description:
    "Join Driver's License Application today to create your account, start your driving journey, and prepare for your tests with ease.",
};

const Signup = () => {
  return <SignupForm />;
};

export default Signup;
