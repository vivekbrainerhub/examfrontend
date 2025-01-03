import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../page/user/Login";
import Register from "../page/user/Register.jsx";
import DashboardExam from "../page/exam/DashboardExam.jsx";
import DashboardAdmin from "../page/admin/DashboardAdmin.jsx";
import PrivateLayout from "../layout/PrivateLayout.jsx";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateLayout>
            <DashboardExam />
          </PrivateLayout>
        }
      />

      <Route
        path="/dashboard-admin"
        element={
          <PrivateLayout>
            <DashboardAdmin />
          </PrivateLayout>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
