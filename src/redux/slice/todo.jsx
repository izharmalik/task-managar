import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Action
export const fetchTodos = createAsyncThunk("todo/fetchTodos", async (form) => {
  console.log(form);
  //   const response = await fetch("http://localhost:1337/api/auth/local");
  //   return response.json();

  axios
    .post("http://localhost:1337/api/auth/local", {
      identifier: form.identifier,
      password: form.password,
    })
    .then((res) => [console.log(res)]);
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default todoSlice.reducer;
