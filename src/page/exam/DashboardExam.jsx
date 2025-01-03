import React, { useEffect, useState } from "react";
import Navbar from "../../controller/Navbar";
import { useSelector } from "react-redux";
import InstructionsPage from "../../controller/InstructionsPage";
import Examstart from "./Examstart";
import {
  questionClassService,
  questionService,
  startExamService,
  timeLeftService,
} from "../../services/examService";
import { toast } from "react-toastify";

const DashboardExam = () => {
  const [step, setStep] = useState(1);
  const user = useSelector((store) => store.user.currentuser);
  const question = useSelector((store) => store.exam.questionClass);
  const examStart = useSelector((store) => store.exam);
  const [timeLeft, setTimeLeft] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  console.log(examStart, "start");
  // Convert seconds to HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const fetchTimeLeft = async () => {
    // Return early if timeLeft is 0 or less (stop the interval)
    if (timeLeft === 0) {
      if (intervalId) {
        clearInterval(intervalId); // Stop further API calls
        setIntervalId(null); // Clear the interval ID
      }
      return;
    }

    const payload = {
      email: user.email,
    };
    const response = await timeLeftService(payload);
    console.log(response.timeLeft);

    if (response.timeLeft !== undefined) {
      // Stop the interval if timeLeft reaches 0 or less
      if (response.timeLeft <= 0) {
        setTimeLeft("00:00:00"); // Optionally display 00:00:00 when time is up
        if (intervalId) {
          clearInterval(intervalId); // Stop further API calls
          setIntervalId(null); // Clear the interval ID
        }
      } else {
        setTimeLeft(formatTime(response.timeLeft)); // Format and set time
      }
    }
  };

  const handleStart = async () => {
    console.log("start");
    const payload = {
      email: user.email,
      examDuration: 1, // exam duration in minutes (for example)
    };
    let id;
    const response = await startExamService(payload);
    if (!response.isCompleted) {
      setStep(2);
      id = setInterval(fetchTimeLeft, 1000);
    } else {
      toast.warn(response?.message);
    }

    // Start fetching time left every second

    setIntervalId(id); // Save the intervalId to clear it later

    // Cleanup interval when the exam ends or component unmounts
    return () => {
      if (id) clearInterval(id);
    };
  };

  const fetchQuestion = async () => {
    const response = await questionClassService(user?._id);
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  console.log(timeLeft);

  useEffect(() => {
    return () => {
      // Clean up the interval when the component unmounts
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <>
      <Navbar userName={user.name} />
      {step === 1 && <InstructionsPage handleStart={handleStart} />}
      {step === 2 && <Examstart question={question} timeLeft={timeLeft} />}
    </>
  );
};

export default DashboardExam;
