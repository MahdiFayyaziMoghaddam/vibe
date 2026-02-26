import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import PlayingView from "../PlayingView/PlayingView";
import Button from "@/components/atoms/Button/Button";
import Table from "@/components/molecules/Table/Table";
import Controls from "../Controls";
import TableRow from "@/components/molecules/Table/TableRow";
import { io, Socket } from "socket.io-client";
import getAudioMetadata from "@/utils/getAudioMetadata";
import { useAppState } from "@/contexts/StateContext";
import { State } from "@/app/stream/page";

export default function Owner({
  setState,
}: {
  setState: Dispatch<SetStateAction<State>>;
}) {
  const { state: s, dispatch } = useAppState();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [id, setID] = useState<any>(null);

  useEffect(() => {
    const so = io("ws://localhost:2626");

    const handlers = {
      connect: () => {
        console.log("Connected to server");
        setSocket(so);
      },
      disconnect: () => {
        console.log("Disconnected from server");
        setState(null);
        setID(null);
      },
      connect_error: (error: any) => {
        console.error("Connection error:", error);
      },
      "created-room": (ID: string) => {
        console.log("Room created:", ID);
        setID(ID);
      },
      "connected-to-room": (roomId: string, clientId: string) => {
        console.log("Connected to room:", roomId, "Client:", clientId);
        setState("member");
        setID(roomId);
      },
      "select-music": async (file: any) => {
        try {
          const { metadata } = await getAudioMetadata(file);
          if (metadata) {
            dispatch({ type: "ADD_MUSIC", payload: metadata });
          }
        } catch (error) {
          console.error("Error processing music:", error);
        }
      },
      "change-is-playing": (isPlaying: boolean) => {
        dispatch({ type: isPlaying ? "PLAY_MUSIC" : "PAUSE_MUSIC" });
      },
      "change-current-time": (currentTime: number) => {
        dispatch({ type: "SET_CURRENT_TIME", payload: currentTime });
      },
      left: () => {
        console.log("Left the room");
        setState(null);
        setID(null);
      },
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      so.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        so.off(event, handler);
      });
      so.disconnect();
      setSocket(null);
    };
  }, []);
  const handleLeaveRoom = useCallback(() => {
    if (!socket || !socket.connected) {
      console.error("Cannot leave: socket not connected");
      return;
    }
    socket.emit("leave", { type: "owner" });
    setState(null);
    setID(null);
  }, [socket]);
  return (
    <>
      <div className="relative size-full">
        <PlayingView />
        <p className="absolute left-1 top-1 z-10 text-dark-300 text-sm select-none text-center mb-2 max-xl:hidden">
          Room ID: <span className="select-all text-primary">{id}</span>
        </p>
        <Button
          variant="primary"
          className="absolute left-1 bottom-22 z-10 max-xl:hidden"
          onClick={handleLeaveRoom}
        >
          Delete the room
        </Button>
        <div className="absolute top-0 bottom-0 flex flex-col justify-end grow w-full z-0">
          <div className="flex flex-col justify-start items-center h-full grow overflow-auto z-0">
            <Table
              title="Title"
              description="Description"
              imgSrc="/images/paint.jpg"
              className="my-5 max-sm:my-0! -z-10"
              columns={
                <>
                  <th className="w-8 max-sm:hidden">#</th>
                  <th className="w-80 text-left">Title</th>
                  <th className="w-60">Album</th>
                  <th className="w-30">Duration</th>
                  <th className="w-40">Actions</th>
                </>
              }
              rows={s.allMusics.map((music, index) => (
                <TableRow
                  id={music.id}
                  key={music.id}
                  duration={music.duration}
                  number={index}
                  title={music.title}
                  album={music.album}
                  authors={music.artists}
                  imgSrc={music.image}
                  selected={music.id === s.musicID}
                />
              ))}
            />
          </div>
          <Controls />
        </div>
      </div>
    </>
  );
}
