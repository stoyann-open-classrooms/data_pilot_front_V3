import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import customerReducer from '../features/customer/customerSlice'
import tableReducer from '../features/table/tableSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    customer: customerReducer,
    table: tableReducer
  },
});
