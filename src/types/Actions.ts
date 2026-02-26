import { AudioMetadata, OptionalAudioMetadata } from "./AudioMetadata";
import { Repeat } from "./Repeat";

export type Actions =
  | { type: "EDIT_MUSIC_DETAILS"; payload: OptionalAudioMetadata }
  | { type: "REMOVE_MUSIC"; payload: number }
  | { type: "ADD_MUSIC"; payload: AudioMetadata }
  | { type: "INCREASE_MUSIC_INDEX" }
  | { type: "DECREASE_MUSIC_INDEX" }
  | { type: "SET_MUSIC_ID"; payload: number }
  | { type: "TOGGLE_PLAYING_MUSIC" }
  | { type: "PLAY_MUSIC" }
  | { type: "PAUSE_MUSIC" }
  | { type: "TOGGLE_SHUFFLE" }
  | { type: "CYCLE_REPEAT" }
  | { type: "SET_REPEAT"; payload: Repeat }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "SET_CURRENT_TIME"; payload: number }
  | { type: "TOGGLE_PLAYING_VIEW" }
  | { type: "CLOSE_PLAYING_VIEW" };
