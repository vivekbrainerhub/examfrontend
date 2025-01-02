import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  token: "",
  currentuser: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Add logic to set user if needed
      state.user=action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.currentuser = action.payload.result;
    },
    setUpdate:(state,action)=>{
      state.currentuser = action.payload;
    },
    setReset: (state) => {
      state.token = "";
      state.user = [];
      state.currentuser = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken,setUpdate, setReset } = userSlice.actions;

export default userSlice.reducer;
