import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DrivingQuiz from "@/components/DrivingQuiz";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Driving Test Quiz",
  description:
    "Test your knowledge on driving rules and road safety with this interactive quiz. Get ready to improve your driving skills and ace your driving test!",
};

const Quiz = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <DrivingQuiz />
    </div>
  );
};

export default Quiz;
