import { configureStore } from "@reduxjs/toolkit";
import { socketIoSlice } from "./reducers/socket/websocket";


export const {updateSocketIo}=socketIoSlice.actions
export const store = configureStore({
    reducer: {
        socketIo:socketIoSlice.reducer
    }
})