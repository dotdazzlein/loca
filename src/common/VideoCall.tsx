import React, { useEffect, useRef, useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { socket } from "../lib/soket";
import { useUser } from "../context/UserContext";
import ScrollGrid from "../components/UI/ScrollGrid";
import StreamLoading from "../components/Loading/StreamLoading";
import UserMatched from "../components/UI/UserMatched";

const VideoCall: React.FC = () => {
  const { user } = useUser();
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [hasMediaPermission, setHasMediaPermission] = useState<boolean | null>(true);
  const [permissionError, setPermissionError] = useState<string | null>(null);


  const [partner, setPartner] = useState<{ name?: string; image?: string; } | null>(null);

  const localStreamRef = useRef<MediaStream | null>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const partnerIdRef = useRef<string | null>(null);

  const [searching, setSearching] = useState(false);
  const [matched, setMatched] = useState(false);
  const [connected, setConnected] = useState(false);

  const showControls = searching || matched || connected;

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: true,
        });

        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        setHasMediaPermission(true);
      } catch (error) {
        console.error("Media permission denied:", error);
        setHasMediaPermission(false);
        setPermissionError("Camera or microphone permission denied");
      }
    };

    getMedia();
  }, []);


  const createPeer = () => {
    peerRef.current = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
      ],
    });

    // Send your camera to the other user
    localStreamRef.current?.getTracks().forEach((track) => {
      peerRef.current?.addTrack(track, localStreamRef.current!);
    });

    // Receive other user's video
    peerRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) {

        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Send network info via socket
    peerRef.current.onicecandidate = (event) => {
      if (event.candidate && partnerIdRef.current) {
        socket.emit("signal", {
          to: partnerIdRef.current,
          data: event.candidate,
        });

      }
    };
    setMatched(false)
    setConnected(true)
  };

  const handelStart = async () => {
    socket.connect();
    setSearching(true);

    socket.emit("start-search");

    socket.on("matched", async ({ partnerId, role, partner }) => {
      setSearching(false)
      setPartner(partner);
      setMatched(true)
      partnerIdRef.current = partnerId;
      createPeer();

      // ONLY caller creates offer
      if (role === "caller") {
        const offer = await peerRef.current!.createOffer();
        await peerRef.current!.setLocalDescription(offer);

        socket.emit("signal", {
          to: partnerId,
          data: offer,
        });
      }
    });

    socket.on("signal", async ({ from, data }) => {
      if (!peerRef.current) createPeer();

      // If you receive an offer
      if (data.type === "offer") {
        partnerIdRef.current = from;

        await peerRef.current!.setRemoteDescription(data);

        const answer = await peerRef.current!.createAnswer();
        await peerRef.current!.setLocalDescription(answer);

        socket.emit("signal", {
          to: from,
          data: answer,
        });
      }

      // If you receive an answer
      if (data.type === "answer") {
        await peerRef.current!.setRemoteDescription(data);
      }

      // ICE candidates
      if (data.candidate) {
        await peerRef.current!.addIceCandidate(data);
      }
    });
  };


  const handleDisconnect = () => {
    socket.emit("end-call");
    cleanupConnection();
  };

useEffect(() => {
  socket.on("partner-disconnected", () => {
    console.log("Partner disconnected");

    cleanupConnection();

    // 🔁 Optional: auto re-search (Azar behavior)
    setSearching(true);
    socket.emit("start-search");
  });

  return () => {
    socket.off("partner-disconnected");
  };
}, []);


  const cleanupConnection = () => {
    peerRef.current?.close();
    peerRef.current = null;

    partnerIdRef.current = null;
    setPartner(null);

    setConnected(false);
    setMatched(false);
    setSearching(false);

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
  };


  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-3 h-full">
        {/* LOCAL */}
        <div className="w-1/2 rounded-xl overflow-hidden bg-gray-200 relative">
          {hasMediaPermission === false &&
            <div className="relative w-full bg-white h-full flex items-center justify-center">
              <div className="absolute inset-0 border border-gray-200 rounded-xl">
                <img className="object-cover w-full h-full rounded-xl" src="/hero-bg.png" alt="" />
              </div>

              <div className="z-99 text-center">
                <h1 className="text-black font-semibold text-5xl">LOCA</h1>
                <p className="mt-5">3,322 are matching now!</p>
              </div>

            </div>}
          {hasMediaPermission === true && (
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          )}

          {!searching && !matched && !connected && (
            <button
              onClick={handelStart}
              className="absolute cursor-pointer bottom-6 right-6 bg-white px-5 py-3 rounded-3xl font-bold"
            >
              Start Video Chat
            </button>
          )}

        </div>


        <div className="w-1/2 relative rounded-xl bg-gray-200 overflow-hidden flex items-center justify-center">
          {!searching && !matched && !connected && <ScrollGrid />}

          {searching && !matched && <StreamLoading />}

          {matched && !connected && <UserMatched />}

          {connected && <>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-0 px-6 flex items-center justify-between w-full">
              <h1 className="text-3xl text-white font-bold">LOCA</h1>
              <div className="flex items-center gap-2 text-white">
                <img src={partner?.image} alt="" className="w-8 h-8 rounded-full" />
                <div>
                  <h1 className="font-semibold text-">{partner?.name}</h1>
                  <div className="flex items-center gap-0.5">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLZSoO1zUogOB233_S_6YL-eVPYaQXnRR5GA&s" alt="" className="w-3.5" />
                    <h1 className="text-xs font-bold">IN</h1>
                  </div>
                </div>
              </div>
            </div>
          </>}
        </div>
      </div>

      {showControls && (
        <div className="flex items-center justify-between mt-3 animate-slideUp">
          <div className="flex items-center gap-2">
            <button  onClick={handleDisconnect} className="bg-black text-white p-3 rounded-xl cursor-pointer">esc</button>
            <div className="text-sm">
              <h1 className="font-semibold">End Video Chat</h1>
              <p>Press esc key to end video chat</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-right">
            <div className="text-sm">
              <h1 className="font-semibold">Next Video Chat</h1>
              <p>Press right key to meet others</p>
            </div>
            <button className="bg-black text-white p-3 rounded-xl text-xl cursor-pointer">
              <HiOutlineArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCall;