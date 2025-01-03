import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  question: [],
  startExam: {},
  timeLeft: {},
  paticularQuestion: {},
  questionClass:[]
};

export const questionSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      // Add logic to set question if needed
      state.question = action.payload;
    },
    setQuestionClass: (state, action) => {
      // Add logic to set question if needed
      state.questionClass = action.payload;
    },
    setPaticularQuestion: (state, action) => {
      console.log(action.payload);
      // Add logic to set question if needed
      state.paticularQuestion = action.payload;
    },
    setStartExam: (state, action) => {
      // Add logic to set question if needed
      state.startExam = action.payload;
    },
    setTimeLeft: (state, action) => {
      // Add logic to set question if needed
      state.timeLeft = action.payload;
    },
    setResetQuestion: (state) => {
      state.question = [];
      state.startExam = {};
      state.timeLeft = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setQuestion,
  setResetQuestion,
  setStartExam,
  setTimeLeft,
  setPaticularQuestion,
  setQuestionClass
} = questionSlice.actions;

export default questionSlice.reducer;
