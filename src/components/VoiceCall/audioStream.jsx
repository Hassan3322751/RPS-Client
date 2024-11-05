import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { useSockets } from "../../context-providers/socket-hook";

function VoiceCall({ participantId }) {
  const [stream, setStream] = useState(null);
  const [peerId, setPeerId] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);

  const { socket, room } = useSockets();
  const userVideo = useRef();
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();
    peerInstance.current = peer;

    // Get user media for audio
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((currentStream) => {
        setStream(currentStream);
 
        // Set peer ID and notify backend about joining
        peer.on("open", (id) => {
          setPeerId(id);
          socket.emit("join-voice-call", { peerId: id, roomId: room.roomId });
        });
        
        // Listen for incoming calls
        peer.on("call", (call) => {
          call.answer(currentStream);
          setCallAccepted(true);
          call.on("stream", (remoteStream) => {
            if (userVideo.current) {
              userVideo.current.srcObject = remoteStream;
            }
          });
        });
      })
      .catch((err) => console.error("Failed to get media:", err));
      
      // Listen for peer ID from another user
      socket.on("user-connected", ({ peerId: otherPeerId }) => {
      if (peerInstance.current && otherPeerId) {
        initiateCall(otherPeerId);
      }
    });

    return () => {
      if (peerInstance.current) peerInstance.current.destroy();
      socket.off("user-connected");
    };
  }, [participantId]);

  // Function to initiate a call with another peer
  const initiateCall = (targetPeerId) => {
    if (!stream || !targetPeerId) return;

    const call = peerInstance.current.call(targetPeerId, stream);
    call.on("stream", (remoteStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = remoteStream;
      }
      setCallAccepted(true); 
    });
  };

  const leaveCall = () => {
    setCallAccepted(false);
    if (peerInstance.current) peerInstance.current.destroy();
  };

  return (
    <>
      {callAccepted ? (
        <audio
          playsInline
          ref={userVideo}
          autoPlay
          style={{ display: 'none' }}
        />
      ) : null}

      {callAccepted && (
        <button onClick={leaveCall} style={{ backgroundColor: "red" }}>
          End Call
        </button>
      )}
    </>
  );
}

export default VoiceCall;