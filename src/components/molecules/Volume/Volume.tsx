"use client";
import Button from "../../atoms/Button/Button";
import { IoMdVolumeHigh, IoMdVolumeLow, IoMdVolumeMute } from "react-icons/io";
import Slider from "../../atoms/Slider/Slider";
import { useAppState } from "@/contexts/StateContext";
import { useHotkey } from "@tanstack/react-hotkeys";

export default function Volume() {
  const { state, dispatch } = useAppState();
  useHotkey("M", toggleMute);
  const volume = state.volume;
  const prevVolume = state.preVolume;

  function toggleMute() {
    if (volume === 0) {
      dispatch({ type: "SET_VOLUME", payload: prevVolume });
    } else {
      dispatch({ type: "SET_VOLUME", payload: 0 });
    }
  }

  return (
    <div className={`relative flex items-center`}>
      <Button
        variant="icon"
        className="rounded-sm! p-1! max-md:p-0.5! *:text-[1.4rem] max-lg:*:text-[1.35rem] max-md:*:text-lg mr-2 max-md:mr-1"
        onClick={toggleMute}
        title={state.volume === 0 ? "Unmute" : "Mute"}
      >
        {volume === 0 ? (
          <IoMdVolumeMute />
        ) : volume < 50 ? (
          <IoMdVolumeLow />
        ) : (
          <IoMdVolumeHigh />
        )}
      </Button>
      <Slider
        max={100}
        value={volume}
        step={1}
        onChange={(v) => {
          dispatch({ type: "SET_VOLUME", payload: v });
        }}
        className="w-12! max-lg:w-10! max-md:w-9! max-sm:w-8! top-[14px] left-[38px] max-lg:left-[33px] max-md:top-[11px] max-md:left-[28px] max-sm:top-[9px] max-sm:left-[20px]"
      />
    </div>
  );
}
