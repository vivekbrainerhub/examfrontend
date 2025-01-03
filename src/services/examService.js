import {
  setPaticularQuestion,
  setQuestion,
  setQuestionClass,
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
export const questionByIdService = (id) => {
  return baseService
    .get(`/questions/${id}`)
    .then((response) => {
      store.dispatch(setPaticularQuestion(response?.data?.data));
      return response.data;
    })
    .catch((error) =>
      error.response?.data ? error.response?.data : error.message
    );
};
export const addQuestionService = (data) => {
  return baseService
    .post("/create-question", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) =>
      error.response?.data ? error.response?.data : error.message
    );
};
export const deleteQuestionService = (id) => {
  return baseService
    .delete(`/questions/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) =>
      error.response?.data ? error.response?.data : error.message
    );
};

export const restoreQuestionService = (id) => {
  return baseService
    .put(`/restore/delete/questions/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) =>
      error.response?.data ? error.response?.data : error.message
    );
};
export const updateQuestionService = (id,data) => {
  return baseService
    .patch(`/questions/${id}`,data)
    .then((response) => {
      return response.data;
    })
    .catch((error) =>
      error.response?.data ? error.response?.data : error.message
    );
};
export const questionClassService = (id) => {
  return baseService
    .get(`/questions/class/${id}`)
    .then((response) => {
      store.dispatch(setQuestionClass(response?.data?.data));
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
