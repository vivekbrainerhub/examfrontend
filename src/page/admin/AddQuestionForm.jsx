import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { addQuestionService } from "../../services/examService";
import { toast } from "react-toastify";

// Validation schema
const schema = yup.object().shape({
  study: yup.number().required("Question set for which class"),
  question: yup.string().required("Question text is required"),
  options: yup
    .array()
    .of(yup.string().required("Option cannot be empty"))
    .min(2, "At least two options are required"),
  answer: yup
    .number()
    .typeError("Answer index must be a number")
    .required("Answer index is required")
    .min(0, "Answer index cannot be less than 0")
    .test(
      "maxIndex",
      "Answer index must be less than the number of options",
      function (value) {
        return value < this.parent.options.length;
      }
    ),
});

const AddQuestionForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      question: "",
      options: ["", ""], // Start with two empty options
      answer: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = async (data) => {
    const response = await addQuestionService(data);
    toast.success(response.message);
    reset();
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Add Question</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Question Field */}
        <div>
          <label className="block font-medium mb-1">
            Question set for which class:
          </label>
          <input
            {...register("study")}
            type="number"
            className={`w-full p-2 border rounded ${
              errors.study ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.study && (
            <p className="text-red-500 text-sm">{errors.study.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Question:</label>
          <textarea
            {...register("question")}
            className={`w-full p-2 border rounded resize-none ${
              errors.question ? "border-red-500" : "border-gray-300"
            }`}
            rows={4} // Adjust the number of rows as needed
          ></textarea>
          {errors.question && (
            <p className="text-red-500 text-sm">{errors.question.message}</p>
          )}
        </div>

        {/* Options Fields */}
        <div>
          <label className="block font-medium mb-1">Options:</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <input
                {...register(`options.${index}`)}
                type="text"
                className={`w-full p-2 border rounded ${
                  errors.options?.[index] ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700"
              >
                <AiOutlineDelete size={24} />
              </button>
              {errors.options?.[index] && (
                <p className="text-red-500 text-sm">
                  {errors.options[index].message}
                </p>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => append("")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <AiOutlinePlus size={18} /> Add Option
          </button>
        </div>

        {/* Answer Field */}
        <div>
          <label className="block font-medium mb-1">Answer (Index):</label>
          <input
            {...register("answer")}
            type="number"
            className={`w-full p-2 border rounded ${
              errors.answer ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.answer && (
            <p className="text-red-500 text-sm">{errors.answer.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddQuestionForm;
