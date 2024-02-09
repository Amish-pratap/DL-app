"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { quizQuestions } from "@/helpers/helper";

const Quiz = () => {
  const [questions, setQuestions] = useState(quizQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds for 1 minute
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizFailed, setQuizFailed] = useState(false);

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

  const congratulateUser = () => {
    alert(
      "Congratulations! You have passed the test and received your learner's license."
    );
  };

  const generateLicense = () => {
    const doc = new jsPDF();
    doc.text("Learner's License", 105, 10, { align: "center" });
    // You can add more content to the license if needed
    doc.save("learner_license.pdf");
  };

  const handleAnswer = (answer: string) => {
    setUserAnswers([...userAnswers, answer]);
    nextQuestion();
  };

  const nextQuestion = () => {
    setTimeLeft(60); // Reset the timer for the next question
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

  return (
    <div className="flex py-2 px-[6%] flex-col">
      {!quizCompleted &&
        !quizFailed &&
        currentQuestionIndex < questions.length && (
          <div>
            <h2 className="text-[20px] font-bold">
              Question {currentQuestionIndex + 1}
            </h2>
            <p className="text-[16px] font-medium pt-2">
              {questions[currentQuestionIndex].question}
            </p>

            <div className="flex flex-col gap-4 pt-2">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  className="flex bg-slate-200 p-2 rounded-md"
                  key={index}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className="pt-2">Time Left: {timeLeft} seconds</p>
          </div>
        )}

      {quizCompleted && (
        <div className="flex flex-col items-center">
          <h2 className="text-[28px] font-bold p-2">Quiz Completed!</h2>
          <p className="font-bold">Your score is: {score}</p>
        </div>
      )}

      {quizFailed && (
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
      )}
    </div>
  );
};

export default Quiz;
