import React, { createContext, useMemo, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { updateSocketIo } from "../store/redux";

export default function SocketProvider() {
  const socketIo = useSelector((state) => state.socketIo.data);
  const dispatch = useDispatch();
  useEffect(() => {
    socketInitializer();
    return () => {
      socketIo?.disconnect();
    };
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");
    dispatch(updateSocketIo(io()));
  }

  return <></>;
}
