import BasicLayout from "@/layouts/BasicLayout";
import { useRouter } from "next/navigation";
import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSelector((state) => state.socketIo.data);
  console.log(socket);
  const navigate = useRouter();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log(socket);
      socket?.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate.push(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket?.on("room:join", handleJoinRoom);
    return () => {
      socket?.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <BasicLayout>
      <div>
        <h1>Lobby</h1>
        <form onSubmit={handleSubmitForm}>
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="room">Room Number</label>
          <input
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <br />
          <button>Join</button>
        </form>
      </div>
    </BasicLayout>
  );
};

export default LobbyScreen;
