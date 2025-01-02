import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../page/user/Login";
import Register from "../page/user/Register.jsx";
import DashboardExam from "../page/exam/DashboardExam.jsx";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardExam />} />
    </Routes>
  );
};

export default AllRoutes;
