import { States } from "@/types/States";

export const initialStates: States = {
  isPlaying: false,
  allMusics: [],
  musicID: null,
  allFavored: [],
  allQueue: [],
  repeat: "none",
  shuffle: false,
  volume: 50,
  preVolume: 50,
  currentTime: 0,
  showPlayingView: false,
  playAfterChange: false,
};
