import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import rapportService from './rapportService';

const initialState = {
  rapports: [],
  rapport: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createRapport = createAsyncThunk(
  'rapport/createRapport',
  async (rapportData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await rapportService.createRapport(rapportData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getRapports = createAsyncThunk(
  'rapport/getRapports',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await rapportService.getRapports(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getRapport = createAsyncThunk(
  'rapport/getRapport',
  async (rapportId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await rapportService.getRapport(rapportId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateRapport = createAsyncThunk(
  'rapport/updateRapport',
  async ({ rapportId, rapportData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await rapportService.updateRapport(rapportId, rapportData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteRapport = createAsyncThunk(
  'rapport/deleteRapport',
  async (rapportId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      await rapportService.deleteRapport(rapportId, token);
      return rapportId; // Return the ID of the deleted rapport
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const rapportSlice = createSlice({
  name: 'rapport',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRapport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRapport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rapport = action.payload;
      })
      .addCase(createRapport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRapports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRapports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rapports = action.payload;
      })
      .addCase(getRapports.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRapport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRapport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rapport = action.payload;
      })
      .addCase(getRapport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateRapport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRapport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rapports = state.rapports.data.map((rapport) =>
          rapport.id === action.payload.id ? action.payload : rapport
        );
      })
      .addCase(updateRapport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRapport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRapport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rapports = state.rapports.filter((rapport) => rapport.id !== action.payload);
      })
      .addCase(deleteRapport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});


export const { reset } = rapportSlice.actions;
export default rapportSlice.reducer;
