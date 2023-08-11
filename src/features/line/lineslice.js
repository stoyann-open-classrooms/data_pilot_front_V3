import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import lineService from './lineService';

const initialState = {
  lines: [],
  line: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createLine = createAsyncThunk(
  'line/createLine',
  async (lineData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await lineService.createLine(lineData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getLines = createAsyncThunk(
  'line/getLines',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await lineService.getLines(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getLine = createAsyncThunk(
  'line/getLine',
  async (lineId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await lineService.getLine(lineId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getLinesForTable = createAsyncThunk(
  'line/getLinesForTable',
  async (tableauId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await lineService.getLinesForTable(tableauId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);



export const updateLine = createAsyncThunk(
  'line/updateLine',
  async ({ lineId, lineData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await lineService.updateLine(lineId, lineData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);




export const deleteLine = createAsyncThunk(
  'line/deleteLine',
  async (lineId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      await lineService.deleteLine(lineId, token);
      return lineId; // Return the ID of the deleted line
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


export const lineSlice = createSlice({
  name: 'line',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.line = action.payload;
      })
      .addCase(createLine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLines.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.lines = action.payload;
      })
      .addCase(getLines.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.line = action.payload;
      })
      .addCase(getLine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateLine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLine.fulfilled, (state, action) => {
        console.log('state before update:', state);
        state.isLoading = false;
        state.isSuccess = true;
        state.lines = state.lines((line) =>
          line.id === action.payload.id ? action.payload : line
        );
      })
      .addCase(updateLine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteLine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLine.fulfilled, (state, action) => {
        console.log('State before filtering:', state);
        state.isLoading = false;
        state.isSuccess = true;
        state.lines = state.lines.data.filter((line) => line.id !== action.payload);
      })
    
      .addCase(deleteLine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLinesForTable.pending, (state) => {
        state.isLoading = true;
        state.isError = false; // Réinitialise l'état d'erreur
        state.message = null; // Réinitialise le message d'erreur
      })
      .addCase(getLinesForTable.fulfilled, (state, action) => {
        console.log("getLinesForTable payload:", action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.lines = action.payload; 
      })
      .addCase(getLinesForTable.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(reset, (state) => { // Utilisez "reset" ici, au lieu de "resetLines"
        return initialState; // Réinitialise l'état à sa valeur initiale
      });
  },
});

  
  export const { reset } = lineSlice.actions;
  export default lineSlice.reducer;
  