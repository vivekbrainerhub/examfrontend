import {
  setQuestion,
  setStartExam,
  setTimeLeft,
} from "../redux/slice/examSlice";
import { store } from "../redux/store";
import baseService from "./baseService";

export const questionService = () => {
  return baseService
    .get("/all-question")
    .then((response) => {
      store.dispatch(setQuestion(response?.data?.data));
      return response.data;
    })
    .catch((error) =>
      error.response?.data ? error.response?.data : error.message
    );
};

export const startExamService = (data) => {
  return baseService
    .post("/start-exam", data)
    .then((response) => {
      console.log(response.data, "startexam123");
      store.dispatch(setStartExam(response?.data));
      return response.data;
    })
    .catch((error) =>
      error.response?.data ? error.response?.data : error.message
    );
};
export const timeLeftService = (data) => {
  return baseService
    .post("/left-time", data)
    .then((response) => {
      store.dispatch(setTimeLeft(response?.data));
      return response.data;
    })
    .catch((error) =>
      error.response?.data ? error.response?.data : error.message
    );
};

export const submitAnswerService = (data) => {
  return baseService
    .post("/submit-answer", data)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) =>
      error.response?.data ? error.response?.data : error.message
    );
};
