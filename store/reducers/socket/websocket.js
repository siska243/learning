import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const socketIoSlice=createSlice({
    name: "socket-io",
    initialState: {
      loading: false,
      data: null,
      error: null,
    },
    reducers: {
      updateSocketIo: (state,action) => {
        console.log(typeof action.type)
        state.data=action.payload
      },
    },
})