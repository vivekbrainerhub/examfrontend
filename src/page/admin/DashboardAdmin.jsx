import React, { useEffect } from "react";
import Navbar from "../../controller/Navbar";
import { useSelector } from "react-redux";
import AddQuestionForm from "./AddQuestionForm";
import Dashboard from "./Dashboard";
import { questionService } from "../../services/examService";

const DashboardAdmin = () => {
  const user = useSelector((store) => store.user.currentuser);
    const fetchQuestion = async () => {
      const response = await questionService();
    };
  
    useEffect(() => {
      fetchQuestion();
    }, []);
  return (
    <>
      <Navbar userName={user.name} />
      <Dashboard />
      {/* <AddQuestionForm /> */}
    </>
  );
};

export default DashboardAdmin;
