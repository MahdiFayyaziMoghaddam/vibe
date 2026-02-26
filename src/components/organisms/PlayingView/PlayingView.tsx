"use client";
import { useHotkey } from "@tanstack/react-hotkeys";
import Image from "../../atoms/Image/Image";
import { useAppState } from "@/contexts/StateContext";

export default function PlayingView() {
  const { state, dispatch } = useAppState();
  useHotkey("Escape", () => dispatch({ type: "CLOSE_PLAYING_VIEW" }));
  const currentMusic = state.allMusics.find(
    (music) => music.id === state.musicID,
  );
  const nextMusic =
    state.allMusics[
      state.allMusics[state.allMusics.length - 1]?.id === state.musicID
        ? 0
        : state.allMusics.findIndex((music) => music.id === state.musicID) + 1
    ];
  return (
    <>
      {/* <Button
        variant="primary"
        title={`${isShowPlayingView ? "Close" : "Open"} Playing View`}
        className={`absolute z-50 top-1 right-1 p-0.5! *:text-xl hover:opacity-100 active:opacity-100 duration-250! shadow-2xs shadow-dark-700 ${
          isShowPlayingView ? "opacity-30" : ""
        }`}
        onClick={toggleShowPlayingView}
      >
        <MdPreview />
      </Button> */}

      {/* Playing View */}
      <div
        className={`fixed h-full bg-dark-800 border-l-1 border-l-dark-400 overflow-y-auto z-40 scrollbar-hidden max-md:hidden transition-all ${
          !state.showPlayingView ? "-right-[361px]" : "right-0"
        }`}
      >
        <div className="relative size-90! max-sm:size-70! border-b-1 border-b-dark-400 overflow-hidden ">
          <Image src={currentMusic?.image || ""} alt="" className="size-full" />
          <div className="absolute top-0 right-0 bottom-0 left-0 shadow-[0_-3rem_8rem_inset] shadow-dark-900">
            <div className="absolute w-full bottom-0 px-2 py-1">
              <p
                className="text-dark-100 text-2xl line-clamp-1"
                title={currentMusic?.title || "Music Title"}
              >
                {currentMusic?.title || "Music Title"}
              </p>
              <p
                className="text-dark-200 text-[1rem] line-clamp-1"
                title={currentMusic?.artists || "Music Artists"}
              >
                {currentMusic?.artists || "Music Artists"}
              </p>
            </div>
          </div>
        </div>

        {state.repeat === "all" && state.allMusics.length > 1 ? (
          <div className="flex flex-col w-full px-5 py-5">
            <h2 className="text-dark-200 text-sm select-none font-semibold mb-4">
              Next Queue:
            </h2>
            <div className="flex items-center justify-between w-full p-1.5 bg-dark-700! border-1 border-dark-400 rounded-sm">
              <div
                className={`bg-transparent flex items-center gap-2.5 rounded-sm w-63`}
              >
                <Image
                  className="size-[3rem]! aspect-square rounded-[0.2rem] border-1 border-dark-400"
                  src={nextMusic?.image || ""}
                  alt={nextMusic?.title || "Music Title"}
                />
                <div className="flex flex-col grow">
                  <p
                    className="text-[1rem] text-dark-200 line-clamp-1"
                    title={nextMusic?.title || "Music Title"}
                  >
                    {nextMusic?.title || "Music Title"}
                  </p>
                  <p
                    className="text-[0.8rem] text-dark-200/60 line-clamp-1"
                    title={nextMusic?.artists || "Music Artists"}
                  >
                    {nextMusic?.artists || "Music Artist"}
                  </p>
                </div>
              </div>
              {/* <Tooltip title={"Remove from queue"} placement="topRight">
                <Button variant="primary" className="p-1! mr-2.5">
                  <IoMdTrash />
                </Button>
              </Tooltip> */}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
