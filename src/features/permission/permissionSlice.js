import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizationService from "./permissionService";

const initialState = {
  authorizations: [],
  authorization: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createAuthorization = createAsyncThunk(
  "authorization/createAuthorization",
  async (authorizationData, thunkAPI) => {
    try {
      return await authorizationService.createAuthorization(authorizationData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAuthorizations = createAsyncThunk(
  "authorization/getAuthorizations",
  async (_, thunkAPI) => {
    try {
      return await authorizationService.getAuthorizations();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAuthorization = createAsyncThunk(
  "authorization/getAuthorization",
  async (authorizationId, thunkAPI) => {
    try {
      return await authorizationService.getAuthorization(authorizationId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateAuthorization = createAsyncThunk(
  "authorization/updateAuthorization",
  async ({ authorizationId, authorizationData }, thunkAPI) => {
    try {
      return await authorizationService.updateAuthorization(
        authorizationId,
        authorizationData
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteAuthorization = createAsyncThunk(
  "authorization/deleteAuthorization",
  async (authorizationId, thunkAPI) => {
    try {
      await authorizationService.deleteAuthorization(authorizationId);
      return authorizationId; // Return the ID of the deleted authorization
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAuthorization.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAuthorization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.authorization = action.payload;
      })
      .addCase(createAuthorization.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAuthorizations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuthorizations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.authorizations = action.payload;
      })
      .addCase(getAuthorizations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getAuthorization.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuthorization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.authorization = action.payload;
      })
      .addCase(getAuthorization.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAuthorization.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAuthorization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.authorizations= state.authorizations.data.map((authorization) =>
          authorization.id === action.payload.id
            ? action.payload
            : authorization
        );
      })
      .addCase(updateAuthorization.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteAuthorization.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAuthorization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.authorizations = state.authorizations.data.filter(
          (authorization) => authorization.id !== action.payload
        );
      })
      .addCase(deleteAuthorization.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authorizationSlice.actions;
export default authorizationSlice.reducer;
