import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import permissionService from "./permissionRapportService";

const initialState = {
  permissions: [],
  permission: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createPermission = createAsyncThunk(
  "permission/createPermission",
  async (permissionData, thunkAPI) => {
    try {
      return await permissionService.createPermission(permissionData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getPermissions = createAsyncThunk(
  "permission/getPermissions",
  async (_, thunkAPI) => {
    try {
      return await permissionService.getPermissions();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getPermission = createAsyncThunk(
  "permission/getPermission",
  async (permissionId, thunkAPI) => {
    try {
      return await permissionService.getPermission(permissionId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updatePermission = createAsyncThunk(
  "permission/updatePermission",
  async ({ permissionId, updatedData }, thunkAPI) => {
    try {
      return await permissionService.updatePermission(permissionId, updatedData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deletePermission = createAsyncThunk(
  "permission/deletePermission",
  async (permissionId, thunkAPI) => {
    try {
      await permissionService.deletePermission(permissionId);
      return permissionId; // Return the ID of the deleted permission
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPermission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.permission = action.payload;
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPermissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.permissions = action.payload;
      })
      .addCase(getPermissions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPermission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPermission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.permission = action.payload;
      })
      .addCase(getPermission.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePermission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePermission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.permissions = state.permissions.map((permission) =>
          permission.id === action.payload.id
            ? action.payload
            : permission
        );
      })
      .addCase(updatePermission.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePermission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.permissions = state.permissions.filter(
          (permission) => permission.id !== action.payload
        );
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = permissionSlice.actions;
export default permissionSlice.reducer;
