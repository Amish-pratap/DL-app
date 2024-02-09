"use client";
import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

const Quiz = () => {
  const [questions, setQuestions] = useState([
    {
      question: "What does a red traffic light signify?",
      options: ["Stop", "Go", "Proceed with caution", "Speed up"],
      correctAnswer: "Stop",
    },
    {
      question: "What does a green arrow signal mean?",
      options: [
        "Continue in the direction of the arrow",
        "Stop and wait for the arrow to turn off",
        "Make a U-turn",
        "Slow down and proceed carefully",
      ],
      correctAnswer: "Continue in the direction of the arrow",
    },
    {
      question:
        "What is the maximum permitted blood alcohol concentration (BAC) for drivers in India?",
      options: ["0.05%", "0.08%", "0.03%", "Zero tolerance"],
      correctAnswer: "0.03%",
    },
    {
      question:
        "When driving, what should you do if you see pedestrians at a zebra crossing?",
      options: [
        "Speed up to cross before them",
        "Slow down and stop to allow them to cross",
        "Honk to warn them",
        "Continue driving at the same speed",
      ],
      correctAnswer: "Slow down and stop to allow them to cross",
    },
    {
      question: "What does a solid yellow line on the road indicate?",
      options: [
        "No overtaking",
        "Overtake with caution",
        "Change lanes freely",
        "Pedestrian crossing ahead",
      ],
      correctAnswer: "No overtaking",
    },
    {
      question: "What is the speed limit in a school zone?",
      options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
      correctAnswer: "30 km/h",
    },
    {
      question: "What does a roundabout sign indicate?",
      options: [
        "Yield to traffic on the right",
        "Give way to traffic on the left",
        "Stop and proceed when clear",
        "Accelerate to merge quickly",
      ],
      correctAnswer: "Yield to traffic on the right",
    },
    {
      question: "When should you use your vehicle's hazard lights?",
      options: [
        "When overtaking",
        "When parking illegally",
        "During heavy rain or fog",
        "To indicate a turn",
      ],
      correctAnswer: "During heavy rain or fog",
    },
    {
      question: "What does a broken white line on the road mean?",
      options: [
        "No overtaking",
        "Overtaking allowed",
        "No stopping",
        "No parking",
      ],
      correctAnswer: "Overtaking allowed",
    },
    {
      question: "What should you do if you witness a road accident?",
      options: [
        "Stop and provide assistance if safe to do so",
        "Ignore and continue driving",
        "Take pictures and post on social media",
        "Call a friend to inform them about the accident",
      ],
      correctAnswer: "Stop and provide assistance if safe to do so",
    },
  ]);
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
    if (score > 8) {
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
