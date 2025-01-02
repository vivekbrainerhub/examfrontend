import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import { loginService, registerService } from "../../services/userService";
import { toast } from "react-toastify"; // Import the toast function
import "react-toastify/dist/ReactToastify.css";
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const response = await loginService(data);
    if (response?.status === "success") {
      toast.success(response.message);
      navigate("/dashboard");
    } else {
      toast.error(response?.data);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Login
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2.5 border rounded-lg focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600"
                placeholder="name@company.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2.5 border rounded-lg focus:ring-primary-600 dark:bg-gray-700 dark:border-gray-600"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms.message}</p>
            )}

            <button
              type="submit"
              className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Login
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-gray-600 hover:underline dark:text-primary-500"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
