import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/fetchUsers';
import { addUser } from '../thunks/addUser';
import { removeUser } from '../thunks/removeUser';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    //////////////////////// FETCH a USER
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error;
    });
    ////////////////////////  ADD a USER with Faker
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.error = action.error;
    });
    ////////////////////// REMOVE a USER
    builder.addCase(removeUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    });
    builder.addCase(removeUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
