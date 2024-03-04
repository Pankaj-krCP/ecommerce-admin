import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

export const getEnquiries = createAsyncThunk(
  "enquiry/get-enquiries",
  async (thunkAPI) => {
    try {
      return await enquiryService.getEnquiries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAEnquiry = createAsyncThunk(
  "enquiry/update-enquiry",
  async (enquiry, thunkAPI) => {
    try {
      return await enquiryService.updateEnquiry(enquiry);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAEnquiry = createAsyncThunk(
  "enquiry/delete-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.deleteEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("reset_all");
export const resetMsgState = createAction("reset_msg");

const initialState = {
  enquiries: [],
  updatedEnquiry: "",
  deletedEnquiry: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const enquirySlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAEnquiry.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedEnquiry = action.payload;
      })
      .addCase(deleteAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateAEnquiry.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedEnquiry = action.payload;
      })
      .addCase(updateAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(resetState, () => initialState)
      .addCase(resetMsgState, (state, action) => {
        state.updatedEnquiry = "";
        state.deletedEnquiry = "";
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = "";
      });
  },
});
export default enquirySlice.reducer;
