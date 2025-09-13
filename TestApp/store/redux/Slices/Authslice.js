import { createSlice } from "@reduxjs/toolkit";



export const authSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {},
    accessToken: null,
    refreshToken: null,
    fcmToken: '',
    deviceToken: '',
    visited: null,
  },
  reducers: {
    userData: (state, action) => {
      state.userData = action.payload;
    },
    accessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    refreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    setDeviceToken: (state, action) => {
      state.deviceToken = action.payload;
    },
    setVisited: (state, action) => {
      state.visited = action.payload;
    },
  },
});

export const {
  userData,
  accessToken,
  setFcmToken,
  refreshToken,
  setDeviceToken,
  setVisited,
} = authSlice.actions;

export default authSlice.reducer;
