import React, { useEffect, useState } from "react";
import AddQuestionForm from "./AddQuestionForm";
import Question from "./Question";
import { questionService } from "../../services/examService";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [step, setStep] = useState(1);
  useEffect(() => {
    questionService();
  }, [step]);
  const question = useSelector((store) => store.exam.question);
  return (
    <div className="p-5">
      {/* Header with buttons */}
      <div className="flex justify-end mb-5">
        <button
          onClick={() => setStep(1)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-3 hover:bg-blue-600"
        >
          Add
        </button>
        <button
          onClick={() => setStep(2)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          All Questions
        </button>
      </div>

      {/* Main Dashboard Content */}
      {step === 1 ? <AddQuestionForm /> : <Question question={question} />}
    </div>
  );
};

export default Dashboard;
