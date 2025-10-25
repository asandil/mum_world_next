import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  count: 0,
  products: []
}

export const cartReducer = createSlice({
  name: "authStore",
  initialState,
  reducers:{
    login: (state, action) => {
      state.auth = action.payload
    },
    logout: (state, action) => {
      state.auth = null
    }
  }
})

export const {  } = cartReducer.actions
export default cartReducer.reducer;