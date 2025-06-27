import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosLib from "@library/AxiosLib";

export const fetchChatbotResponse = createAsyncThunk<any, any>(
  "appSiyad/fetchChatbotResponse",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await AxiosLib.post(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
          inputs: params?.inputs,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const siyadsAppChatbotSlice = createSlice({
  name: "siyadsAppChatbot",
  initialState: {
    fetchchatbotApiMeta: null,
    fetchchatbotApiBegin: false,
    fetchchatbotApiData: null,
    fetchchatbotApiFailure: false,
    fetchchatbotApiFailureMessage: "",
  },
  reducers: {
    dismissReportStates: (state) => {
      state.fetchchatbotApiBegin = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatbotResponse.pending, (state) => {
      state.fetchchatbotApiBegin = true;
    });
    builder.addCase(fetchChatbotResponse.fulfilled, (state, action) => {
      state.fetchchatbotApiBegin = false;
      state.fetchchatbotApiData = action.payload;
      state.fetchchatbotApiMeta = action.payload.pagination;
    });
    builder.addCase(fetchChatbotResponse.rejected, (state, action: any) => {
      state.fetchchatbotApiBegin = false;
      state.fetchchatbotApiFailure = true;
      state.fetchchatbotApiFailureMessage = action?.payload?.message || "";
    });
  },
});

export const { dismissReportStates } = siyadsAppChatbotSlice.actions;
export default siyadsAppChatbotSlice.reducer;
