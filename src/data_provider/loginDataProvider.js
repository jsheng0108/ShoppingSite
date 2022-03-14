import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "loginState",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") ?? false,
    userName: localStorage.getItem("userName") ?? "",
    userType: localStorage.getItem("userType") ?? null,
  },
  reducers: {
    // {payload: {isLoggedIn, userType}}
    changeLoginStatus: (state, userStatus) => {
      state.isLoggedIn = userStatus.payload.isLoggedIn;
      state.userType = userStatus.payload.userType;
    },
    setUserName: (state, userName) => {
      state.userName = userName.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeLoginStatus, setUserName } = loginSlice.actions;

export default loginSlice.reducer;
