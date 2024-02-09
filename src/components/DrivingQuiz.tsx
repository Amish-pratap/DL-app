"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { quizQuestions } from "@/helpers/helper";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Quiz = () => {
  const { data: session } = useSession();
  const [questions, setQuestions] = useState(quizQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds for 1 minute
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizFailed, setQuizFailed] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    email: "",
    phoneNo: "",
    image: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft((prevTime) => prevTime - 1);
        } else {
          nextQuestion();
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, timeLeft]);

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      calculateScore();
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (score >= 8) {
      setQuizCompleted(true);
      congratulateUser();
      generateLicense();
    } else if (currentQuestionIndex >= questions.length) {
      setQuizFailed(true);
    }
  }, [score]);

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

  const congratulateUser = () => {
    alert(
      "Congratulations! You have passed the test and received your learner's license."
    );
  };

  const isProfileComplete = (userInfo: any) => {
    return (
      userInfo &&
      userInfo.name &&
      userInfo.address &&
      userInfo.email &&
      userInfo.phoneNo
    );
  };

  const generateLicense = () => {
    const doc = new jsPDF();

    //  if (session?.user?.image) {
    //    const userImage = new Image();
    //    userImage.src = session.user.image;

    //    doc.addImage(userImage, "PNG", 10, 10, 50, 50);
    //  }

    // image only works for github only for now don't have time to solve it

    doc.text("Learner's License", 105, 10, { align: "center" });
    doc.save("learner_license.pdf");
  };

  const handleAnswer = (answer: string) => {
    setUserAnswers([...userAnswers, answer]);
    nextQuestion();
  };

  const nextQuestion = () => {
    setTimeLeft(60);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const calculateScore = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].correctAnswer) {
        newScore++;
      }
    }
    setScore(newScore);
  };

  const handleRetakeQuiz = () => {
    setQuizFailed(false);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setTimeLeft(60);
  };

  if (userInfo.name === "") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex py-2 px-[6%] flex-col">
      {isProfileComplete(userInfo) ? (
        <div>
          {!quizCompleted &&
          !quizFailed &&
          currentQuestionIndex < questions.length ? (
            <div>
              <h2 className="text-[20px] font-bold">
                Question {currentQuestionIndex + 1}
              </h2>
              <p className="text-[16px] font-medium pt-2">
                {questions[currentQuestionIndex].question}
              </p>

              <div className="flex flex-col gap-4 pt-2">
                {questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <button
                      className="flex bg-slate-200 p-2 rounded-md"
                      key={index}
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
              <p className="pt-2">Time Left: {timeLeft} seconds</p>
            </div>
          ) : null}

          {quizCompleted ? (
            <div className="flex flex-col items-center">
              <h2 className="text-[28px] font-bold p-2">Quiz Completed!</h2>
              <p className="font-bold">Your score is: {score}</p>
            </div>
          ) : null}

          {quizFailed ? (
            <div className="flex flex-col items-center">
              <h2 className="text-[28px] font-bold p-2">Quiz Failed!</h2>
              <p className="font-bold">Your score is: {score}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={handleRetakeQuiz}
              >
                Retake Quiz
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-4">
          <p className="text-red-500 text-lg font-semibold">
            Please complete your profile before taking the quiz.
          </p>
          <Link href="/profile">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
              Go to Profile
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Quiz;
