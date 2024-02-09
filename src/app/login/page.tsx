import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Driver's Licence Application - Login",
  description:
    "Access your Driver's License Application account to manage your profile, take tests, and track your progress.",
};

const Login = () => {
  return <LoginForm />;
};

export default Login;
