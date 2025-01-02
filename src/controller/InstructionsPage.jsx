import React from "react";

const InstructionsPage = ({handleStart}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md">
        <div className="bg-blue-600 text-white text-center py-2 rounded-t-lg">
          <h2 className="font-bold text-lg">Instructions</h2>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-center mb-4">Instructions</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Welcome to Online Exam for General Aptitude Exam</li>
            <li>Exam has Total 15 Questions</li>
            <li>Total Time for Exam is 30 Minutes</li>
            <li>Negative Marking Exam: <span className="font-bold">No</span></li>
          </ul>
          <p className="mt-4 text-center text-gray-600 italic">
            Best of Luck for your Exam
          </p>
        </div>
        <div className="px-6 pb-6">
          <button onClick={()=>handleStart()} className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
