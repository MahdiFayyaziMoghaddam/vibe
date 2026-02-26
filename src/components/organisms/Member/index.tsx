import { State } from "@/app/stream/page";
import Button from "@/components/atoms/Button/Button";
import Slider from "@/components/atoms/Slider/Slider";
import MusicCard from "@/components/molecules/Card/MusicCard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoPause } from "react-icons/io5";
import { io, Socket } from "socket.io-client";

// ok now complete

export default function Member({
  setState,
}: {
  setState: Dispatch<SetStateAction<State>>;
}) {
  const [id, setID] = useState<any>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const so = io("ws://localhost:2626");
    so.on("connect", () => {
      setSocket(so);
    });
  }, []);

  return (
    <div className="m-auto">
      <p className="text-[0.88rem] leading-[3] text-dark-200 select-none">
        Room ID: <span className="text-primary">{id}</span>
      </p>
      <div className="m-auto w-80">
        <div className="bg-linear-0 from-dark-800 to-dark-800 rounded-md pt-2 px-2 pb-1 border-1 border-dark-400">
          <div className="flex justify-between items-center mb-2">
            <MusicCard title="Music" subtitle="sub" />
            {/* <Equalizer /> */}
            <IoPause className="text-dark-200 text-xl" />
          </div>
          <div className="flex items-center justify-between text-xs text-dark-200 select-none">
            <span>00:00</span>
            <Slider
              className="w-[14rem]"
              value={5}
              max={10}
              scrollLock
              noLabel
            />
            <span>00:00</span>
          </div>
        </div>
        <Button
          variant="primary"
          className="mt-6"
          onClick={() => socket?.id && socket.emit("leave", { type: "member" })}
        >
          Leave
        </Button>
      </div>
    </div>
  );
}
