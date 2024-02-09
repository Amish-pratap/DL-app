export const isValidEmail = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const isValidName = (name: string) => {
  return name.trim().length > 3;
};

export const isValidPhoneNumber = (phone: string) => {
  const regex = /^\d{10}$/;
  return regex.test(phone);
};

export const isValidAddress = (address: string) => {
  return address.trim().length > 10;
};

export const quizQuestions = [
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
];
