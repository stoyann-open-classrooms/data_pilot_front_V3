import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import customerReducer from '../features/customer/customerSlice'
import tableReducer from '../features/table/tableSlice'
import lineReducer from '../features/line/lineslice'
import authorizationReducer from '../features/permission/permissionSlice';
import permissionReducer from '../features/permissionRapport/permissionRaportSlice';
import rapportReducer from '../features/rapport/rapportSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    customer: customerReducer,
    table: tableReducer,
    line: lineReducer,
    authorization: authorizationReducer,
    permission: permissionReducer,
    rapport: rapportReducer
  },
});
