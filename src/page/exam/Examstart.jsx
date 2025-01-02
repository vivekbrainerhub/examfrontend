import React, { useState, useEffect } from "react";
import { submitAnswerService } from "../../services/examService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Examstart = ({ question, timeLeft }) => {
  const [answers, setAnswers] = useState(Array(question?.length).fill(null));
  const [time, setTime] = useState(timeLeft);
  const user = useSelector((store) => store.user.currentuser);
  const navigate = useNavigate();
  // Update the timer every secondtimeLeft
  useEffect(() => {
    if (timeLeft === "00:00:01") {
      handleSubmit();
    }
  }, [timeLeft]);
  console.log(timeLeft, "time");

  // Handle option selection
  const handleOptionChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];

    // If the same option is clicked again, uncheck it (set answer to null)
    if (newAnswers[questionIndex] === optionIndex) {
      newAnswers[questionIndex] = null; // Reset to null if the same option is clicked again
    } else {
      newAnswers[questionIndex] = optionIndex; // Set the selected option
    }

    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    const payload = {
      email: user.email,
      answers: answers,
    };

    const response = await submitAnswerService(payload);
    if (response) {
      toast.success(response.message);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      {/* Timer at the top-right */}
      <div className="absolute top-6 right-6 text-xl font-semibold text-red-600">
        Time: {timeLeft}
      </div>

      <h1 className="text-3xl font-bold mb-6 text-blue-600">MCQ Questions</h1>
      <div className="w-full max-w-4xl space-y-6">
        {question?.map((item, index) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {index + 1}. {item?.question}
            </h3>
            <div className="space-y-2">
              {item.options.map((option, optionIndex) => (
                <label
                  key={optionIndex}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name={`question-${index}`}
                    value={optionIndex}
                    checked={answers[index] === optionIndex}
                    onChange={() => handleOptionChange(index, optionIndex)}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-600">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-10rem text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Submit
      </button>
    </div>
  );
};

export default Examstart;
