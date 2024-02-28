import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";

export const getColors = createAsyncThunk(
  "color/get-colors",
  async (thunkAPI) => {
    try {
      return await colorService.getColors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createColor = createAsyncThunk(
  "color/create-colors",
  async (color, thunkAPI) => {
    try {
      return await colorService.createColor(color);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAColor = createAsyncThunk(
  "color/update-color",
  async (color, thunkAPI) => {
    try {
      return await colorService.updateColor(color);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAColor = createAsyncThunk(
  "color/delete-color",
  async (id, thunkAPI) => {
    try {
      return await colorService.deleteColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("resete_all");
export const resetMsgState = createAction("Reset_msg");

const initialState = {
  colors: [],
  createdColor: "",
  updatedColor: "",
  deletedColor: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createColor.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdColor = action.payload;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedColor = action.payload;
      })
      .addCase(deleteAColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedColor = action.payload;
      })
      .addCase(updateAColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState)
      .addCase(resetMsgState, (state) => {
        state.createdColor = "";
        state.updatedColor = "";
        state.deletedColor = "";
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = "";
      });
  },
});
export default colorSlice.reducer;
