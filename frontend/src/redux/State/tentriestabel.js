// features/transaction/transactionSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//Async thunk
const createFullTransaction = createAsyncThunk(
  "transaction/createFullTransaction",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/transactions/full",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data.transaction;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to create transaction"
      );
    }
  }
);
//Add this thunk
const getAllTransactions = createAsyncThunk(
  "transaction/getAllTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // Should show an array
      return response.data; // ✅ return the full array
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch transactions"
      );
    }
  }
);
//updet tranctions
export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/transactions/${id}`, // ✅ Use backticks for interpolation
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // ✅ Ensure token exists
          },
        }
      );
      return response.data.transaction;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);
// FETCH single transaction by ID
export const fetchTransactionById = createAsyncThunk(
  "transaction/fetchTransactionById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("fatchid data", response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch transaction"
      );
    }
  }
);
//Delete route
export const deleteFullTransaction = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/transactions/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log("Deleted successfully:", response.data);
    return response.data;
  } catch (err) {
    console.error("Delete failed:", err.response?.data || err.message);
    throw err;
  }
};

//Slice
const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [], // ✅ not undefined
    selectedTransaction: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFullTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFullTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.push(action.payload);
      })
      .addCase(createFullTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // GET ALL TRANSACTIONS
      .addCase(getAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //fatchid
      // FETCH BY ID
      .addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.selectedTransaction = action.payload;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default transactionSlice.reducer;

export { createFullTransaction, getAllTransactions }; // ✅ <-- THIS FIXES THE IMPORT ERROR
