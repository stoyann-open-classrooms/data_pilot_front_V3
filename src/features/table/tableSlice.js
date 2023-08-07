import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tableService from './tableService';

const initialState = {
  tables: [],
  table: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createTable = createAsyncThunk(
  'table/createTable',
  async (tableData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await tableService.createTable(tableData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getTables = createAsyncThunk(
  'table/getTables',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await tableService.getTables(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getTable = createAsyncThunk(
  'table/getTable',
  async (tableId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await tableService.getTable(tableId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateTable = createAsyncThunk(
  'table/updateTable',
  async ({ tableId, tableData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      return await tableService.updateTable(tableId, tableData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteTable = createAsyncThunk(
  'table/deleteTable',
  async (tableId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user;
      await tableService.deleteTable(tableId, token);
      return tableId; // Return the ID of the deleted table
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.table = action.payload;
      })
      .addCase(createTable.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTables.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTables.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tables = action.payload;
      })
      .addCase(getTables.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.table = action.payload;
      })
      .addCase(getTable.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tables = state.tables.map((table) =>
          table.id === action.payload.id ? action.payload : table
        );
      })
      .addCase(updateTable.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tables = state.tables.filter((table) => table.id !== action.payload);
      })
      .addCase(deleteTable.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = tableSlice.actions;
export default tableSlice.reducer;
