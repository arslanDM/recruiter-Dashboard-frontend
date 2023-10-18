import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: "",
  isAuthentication: false,
  authLoading: true,
};

const authSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.authLoading = false;
      state.isAuthentication = true;
    },

    loadUser: (state, action) => {
      state.user = action.payload.user;
      state.authLoading = false;
      state.isAuthentication = false;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    logout: (state, action) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = "";
      state.authLoading = false;
      state.isAuthentication = false;
    },
  },
  extraReducers: {},
});

export const { setToken, logout, loadUser, setProfile } = authSlicer.actions;
export default authSlicer.reducer;
