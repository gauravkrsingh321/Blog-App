import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn:false,
  user:{}
}

export const authUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state,action) => {
      const payload = action.payload;
      state.isLoggedIn = true;
      state.user = payload;
    },

    removeUser: (state,action) => {
      state.isLoggedIn = false;
      state.user = {};
    },
  }
})


export const {setUser,removeUser} = authUserSlice.actions;

export default authUserSlice.reducer;