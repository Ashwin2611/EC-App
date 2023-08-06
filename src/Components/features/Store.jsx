import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    value: {
      token: "",
      adminInClub: [],
      adminInClubCount: null,
      committeeInClub: [],
      committeeInClubCount: null,
      memberInCount: [],
      memberInClubCount:null,
      clubs:[],
      admin:false
    },
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { login } = user.actions;
export default user.reducer;
