import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  errorMessage: null,
  data: [],
  success: false,
  error: false,
  addLoader: false,
  addSuccess: false,
  deleteLoader: false,
  deleteSuccess: false,
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
});

export const addUser = createAsyncThunk("users/addUser", async (userData) => {
  const res = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return await res.json();
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    await fetch(`https://fakestoreapi.com/products/${userId}`, {
      method: "DELETE",
    });
    return userId;
  }
);

const userSlice = createSlice({
  name: "details-slice",
  initialState,

  reducers: {
    resetAll: (state) => {
      state.addSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log(action, "action");
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.errorMessage = "";
      state.error = true;
    });

    // add user
    builder.addCase(addUser.pending, (state) => {
      state.addLoader = true;
    });

    builder.addCase(addUser.fulfilled, (state, action) => {
      state.addLoader = false;
      state.data.push(action.payload);
      state.addSuccess = true;
    });

    builder.addCase(addUser.rejected, (state, action) => {
      state.addLoader = false;
      state.errorMessage = action.error.message;
      state.error = true;
      state.addSuccess = false;
    });

    // delete user

    builder.addCase(deleteUser.pending, (state) => {
      state.deleteLoader = true;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      console.log(action, 'action')
      state.deleteLoader = false;
      state.data = state.data.filter((user) => user.id !== action.payload);
    });

    builder.addCase(deleteUser.rejected, (state, action) => {
      state.deleteLoader = false;
      state.errorMessage = action.error.message;
      state.error = true;
      state.deleteLoader = true;
    });
  },
});

export const { resetAll } = userSlice.actions;
export default userSlice.reducer;
