import { AudioMetadata } from "./AudioMetadata";
import { Repeat } from "./Repeat";

export interface States {
  isPlaying: boolean;
  allMusics: AudioMetadata[];
  musicID: number | null;
  allFavored: AudioMetadata[];
  allQueue: AudioMetadata[];
  shuffle: boolean;
  repeat: Repeat;
  volume: number;
  preVolume: number;
  currentTime: number;
  showPlayingView: boolean;
  playAfterChange: boolean;
}
