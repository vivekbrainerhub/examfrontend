import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // You can install react-icons
import {
  deleteQuestionService,
  questionByIdService,
  questionService,
  restoreQuestionService,
} from "../../services/examService";
import { toast } from "react-toastify";
import EditQuestionForm from "./EditQuestionForm";
import { useSelector } from "react-redux";

const Question = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false);
  const questionById = useSelector((store) => store.exam.paticularQuestion);
  console.log(questionById, "ffff");
  const handleEdit = async (id) => {
    let response = await questionByIdService(id);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    const response = await deleteQuestionService(id);
    toast.warn(response?.message);
    await questionService();
  };
  const handleRemoveDelete = async (id) => {
    const response = await restoreQuestionService(id);
    toast.warn(response?.message);
    await questionService();
  };

  const onClose = () => {
    setIsOpen(!isOpen);
  };
  console.log(isOpen, "open");
  return (
    <>
      <div className="max-w-10xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {question?.map((question, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex">
                Class {question?.study}
              </h3>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex justify-between items-center">
                {question?.question}
                {/* Conditionally show the delete button */}
                {question?.delete && (
                  <button
                    onClick={() => handleRemoveDelete(question?._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove Delete
                  </button>
                )}
              </h3>
              <ul className="space-y-2">
                {question?.options.map((option, i) => (
                  <li
                    key={i}
                    className="p-2 border rounded bg-gray-50 hover:bg-gray-100"
                  >
                    {option}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">
                  Correct Answer: {question?.options[question?.answer]}
                </p>
                <div className="flex space-x-2">
                  {!question?.delete && (
                    <>
                      <button
                        onClick={() => handleEdit(question?._id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(question?._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrashAlt />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isOpen && (
        <EditQuestionForm
          questionData={questionById}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default Question;
