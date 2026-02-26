"use client";
import { Dispatch, ReactNode, useEffect, useReducer, useRef, Ref } from "react";
import type { States } from "../types/States";
import type { Actions } from "../types/Actions";
import { createContext, useContextSelector } from "use-context-selector";
import { initialStates, StateReducer } from "@/store";
import { Repeat } from "@/types/Repeat";
import { useHotkey } from "@tanstack/react-hotkeys";

interface IStateContext {
  state: States;
  dispatch: Dispatch<Actions>;
  audio: HTMLAudioElement;
}

const StateContext = createContext<IStateContext | undefined>(undefined);

export function StateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(StateReducer, initialStates);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audio = audioRef.current;

  useHotkey("Space", () => dispatch({ type: "TOGGLE_PLAYING_MUSIC" }));
  useHotkey("R", () =>
    dispatch({
      type: "CYCLE_REPEAT",
    }),
  );

  useEffect(() => {
    const repeat = localStorage.getItem("repeat");
    if (repeat) dispatch({ type: "SET_REPEAT", payload: repeat as Repeat });
    const volume = localStorage.getItem("volume");
    if (volume) dispatch({ type: "SET_VOLUME", payload: +volume });
    navigator.mediaSession.setActionHandler("play", () =>
      dispatch({ type: "PLAY_MUSIC" }),
    );
    navigator.mediaSession.setActionHandler("pause", () =>
      dispatch({ type: "PAUSE_MUSIC" }),
    );
    navigator.mediaSession.setActionHandler("nexttrack", () =>
      dispatch({ type: "INCREASE_MUSIC_INDEX" }),
    );
    navigator.mediaSession.setActionHandler("previoustrack", () =>
      dispatch({ type: "DECREASE_MUSIC_INDEX" }),
    );
  }, []);

  useEffect(() => {
    if (!audio || state.allMusics.length === 0 || !state.musicID) return;
    const music = state.allMusics.find((music) => music.id === state.musicID);
    audio?.pause();
    audio.src = music?.url || "#";
    audio.load();
    state.playAfterChange && dispatch({ type: "PLAY_MUSIC" });
  }, [state.musicID]);

  useEffect(() => {
    if (!audio) return;
    const ctrl = new AbortController();
    (async () => {
      if (state.isPlaying) {
        await audio.play().catch((err) => console.warn(err));
      } else {
        audio?.pause();
      }
      (audio.addEventListener("timeupdate", (e) => {
        dispatch({
          type: "SET_CURRENT_TIME",
          payload: (e.target as HTMLAudioElement).currentTime,
        });
      }),
        { signal: ctrl.signal });
    })();
    return () => ctrl.abort();
  }, [state.isPlaying]);

  useEffect(() => {
    if (!audio) return;
    const ctrl = new AbortController();
    localStorage.setItem("repeat", state.repeat);
    if (state.repeat === "one") {
      audio.loop = true;
    } else if (state.repeat === "all") {
      if (state.allMusics.length > 1) {
        audio.loop = false;
        audio.addEventListener(
          "ended",
          () => {
            dispatch({ type: "INCREASE_MUSIC_INDEX" });
          },
          { signal: ctrl.signal },
        );
      } else {
        audio.loop = true;
      }
    } else {
      audio.loop = false;
      audio.onended = () => dispatch({ type: "PAUSE_MUSIC" });
    }
    return () => ctrl.abort();
  }, [state.currentTime, state.repeat, state.allMusics]);

  useEffect(() => {
    if (!audio) return;
    audio.volume = state.volume / 100;
    localStorage.setItem("volume", state.volume.toString());
  }, [state.volume]);

  useEffect(() => {
    const music = state.allMusics.find((music) => music.id === state.musicID);
    if (
      state.allMusics.length > 0 &&
      music &&
      !music.duration &&
      audio &&
      audio.duration
    ) {
      console.log(`Edited ${music.title} details!`);
      dispatch({
        type: "EDIT_MUSIC_DETAILS",
        payload: {
          id: music.id,
          duration: audio.duration,
        },
      });
    }
  }, [audio?.duration, audio?.src, state.musicID, state.allMusics]);

  return (
    <StateContext.Provider
      value={{ state, dispatch, audio: audio as HTMLAudioElement }}
    >
      {children}
      <audio src="#" ref={audioRef as Ref<HTMLAudioElement>}></audio>
    </StateContext.Provider>
  );
}

export const useAppState = () =>
  useContextSelector(StateContext, (ctx) => ctx) as IStateContext;
