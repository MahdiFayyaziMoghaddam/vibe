"use client";
import Button from "../../atoms/Button/Button";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { IoPause, IoPlay } from "react-icons/io5";
import Slider from "../../atoms/Slider/Slider";
import Volume from "../../molecules/Volume/Volume";
import Repeat from "../../molecules/Repeat/Repeat";
import Image from "@/components/atoms/Image/Image";
import { useAppState } from "@/contexts/StateContext";
import Shuffle from "@/components/molecules/Shuffle";
import durationFormatter from "@/utils/durationFormatter";
import { debounce } from "@/utils/debounce";
import MusicImporter from "@/components/molecules/MusicImporter";

export default function Controls() {
  const { state, dispatch, audio } = useAppState();
  const music = state.allMusics.find((music) => music.id === state.musicID);

  return (
    <>
      <div className="relative flex justify-center items-center bg-dark-800 border-t-1 border-t-dark-400 py-[0.6rem] shrink-0">
        <Button
          variant="icon"
          className="absolute left-7 max-lg:left-4 max-md:left-3 max-sm:left-1.5 hover:bg-dark-400/30! cursor-pointer rounded-md p-1.5! max-lg:p-[5px]! max-md:p-[3px]! max-sm:p-0! gap-2 max-lg:gap-1.5 max-md:gap-1.2"
          title={music?.title || "Music Title"}
          onClick={() => dispatch({ type: "TOGGLE_PLAYING_VIEW" })}
          href={`#${state.musicID}`}
        >
          <Image
            className="w-[3rem] max-lg:size-[2.7rem]! max-md:size-[3.5rem]! max-sm:size-[2.55rem]! aspect-square rounded-[0.3rem] border-1 border-dark-400"
            src={music?.image || ""}
            alt={music?.title || "Music Title"}
          />
          <div className="flex flex-col max-md:hidden">
            <p className="text-[0.95rem] text-dark-200 line-clamp-1 max-lg:text-[0.85rem] max-md:text-[0.75rem] max-sm:text-[0.65rem] max-w-50 max-xl:max-w-40 max-lg:max-w-30 max-md:max-w-22">
              {music?.title || "Music Title"}
            </p>
            <p className="text-[0.75rem] text-dark-200/60 line-clamp-1 max-lg:text-[0.65rem] max-md:text-[0.55rem] max-sm:text-[0.45rem] max-w-50 max-xl:max-w-40 max-lg:max-w-30 max-md:max-w-22">
              {music?.artists || "Music Artist"}
            </p>
          </div>
        </Button>
        <div className="flex flex-col gap-3 justify-self-center justify-center items-center max-md:gap-2 max-sm:gap-1">
          <div className="flex items-center gap-3 max-lg:gap-2.5 max-md:gap-2 z-10">
            <p className="text-[0.7rem] max-md:text-[0.6rem] max-sm:text-[0.5rem] text-dark-200 select-none">
              {durationFormatter(state.currentTime)}
            </p>
            <Slider
              className="w-[30rem]! max-xl:w-[26rem]! max-lg:w-[21rem]! max-md:w-[17rem]! max-sm:w-[11rem]!"
              max={music?.duration || 1}
              value={state.currentTime}
              onChange={debounce((v) => {
                if (music) {
                  dispatch({ type: "SET_CURRENT_TIME", payload: v });
                  audio.currentTime = v;
                }
              }, 10)}
              formattedLabel
            />
            <p className="text-[0.7rem] max-md:text-[0.6rem] max-sm:text-[0.5rem] text-dark-200 select-none">
              {durationFormatter(music?.duration || 0)}
            </p>
          </div>

          <div className="flex items-center gap-4 max-md:gap-2.5 max-sm:gap-1.5">
            <div className="w-23 max-lg:w-21 max-md:w-17 max-sm:w-15 flex items-center justify-end gap-4 max-md:gap-2.5 max-sm:gap-1.5">
              <Shuffle />
              <Repeat />
            </div>
            <Button
              variant="icon"
              className="rounded-sm! p-1! max-md:p-0.5! *:text-2xl max-md:*:text-2xl max-sm:*:text-xl"
              onClick={() => dispatch({ type: "DECREASE_MUSIC_INDEX" })}
              title="Previous Music"
            >
              <IoMdSkipBackward />
            </Button>
            <Button
              variant="icon"
              className="rounded-sm! p-0.5! *:text-4xl max-md:*:text-4xl max-sm:*:text-3xl"
              onClick={() => dispatch({ type: "TOGGLE_PLAYING_MUSIC" })}
              title={state.isPlaying ? "Pause" : "Play"}
            >
              {state.isPlaying ? <IoPause /> : <IoPlay />}
            </Button>
            <Button
              variant="icon"
              className="rounded-sm! p-1! max-md:p-0.5! *:text-2xl max-md:*:text-2xl max-sm:*:text-xl"
              onClick={() => dispatch({ type: "INCREASE_MUSIC_INDEX" })}
              title="Next Music"
            >
              <IoMdSkipForward />
            </Button>
            <div className="w-23 max-lg:w-21 max-md:w-17 max-sm:w-15">
              <Volume />
            </div>
          </div>
        </div>
        <div className="absolute right-7 max-lg:right-4 max-md:right-3 max-sm:right-1.5 flex justify-end w-auto">
          <MusicImporter />
        </div>
      </div>
    </>
  );
}
