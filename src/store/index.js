import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    storeUsers: usersReducer,
  },
});

export * from './thunks/fetchUsers';