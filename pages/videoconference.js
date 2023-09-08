// pages/videoconference.js
import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const VideoConference = () => {
  const videoRef = useRef();
  const [peerConnections, setPeerConnections] = useState({});
  const socket = io.connect('http://localhost:3000'); // Remplacez l'URL par votre serveur Socket.io

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        
        // Envoyer le flux vidéo au serveur via Socket.io
        socket.emit('join-room', { roomId: 'your-room-id', stream });

        // Recevoir le flux vidéo des autres participants
        socket.on('user-connected', ({ userId, stream }) => {
          handleUserConnected(userId, stream);
        });

        // Gérer la déconnexion d'un utilisateur
        socket.on('user-disconnected', userId => {
          handleUserDisconnected(userId);
        });
      })
      .catch(error => console.error('Error accessing camera:', error));
  }, []);

  const handleUserConnected = (userId, stream) => {
    const newPeerConnection = new RTCPeerConnection();
    const newVideo = document.createElement('video');
    newVideo.srcObject = stream;
    newVideo.autoplay = true;
    document.body.appendChild(newVideo);

    setPeerConnections(prevState => ({
      ...prevState,
      [userId]: newPeerConnection,
    }));

    // Ajouter le flux vidéo reçu au PeerConnection
    stream.getTracks().forEach(track => {
      newPeerConnection.addTrack(track, stream);
    });

    // Gérer l'événement ICE (Interactive Connectivity Establishment) pour la communication P2P
    newPeerConnection.onicecandidate = event => {
      if (event.candidate) {
        socket.emit('ice-candidate', { userId, candidate: event.candidate });
      }
    };

    // Gérer l'événement ajouté à la connexion PeerConnection
    newPeerConnection.onaddstream = event => {
      newVideo.srcObject = event.stream;
    };
  };

  const handleUserDisconnected = userId => {
    const peerConnection = peerConnections[userId];
    if (peerConnection) {
      peerConnection.close();
      delete peerConnections[userId];
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted />
    </div>
  );
};

export default VideoConference;
