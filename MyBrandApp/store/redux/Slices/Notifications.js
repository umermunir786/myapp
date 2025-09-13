const { createSlice } = require("@reduxjs/toolkit");

export const NotificationSlice = createSlice({
  initialState: {
    seenNotification: true,
  },
  name: "notification",
  reducers: {
    setSeenNotification: (state, action) => {
      state.seenNotification = action.payload;
    },
  },
});

export const { setSeenNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;
