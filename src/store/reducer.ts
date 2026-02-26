import { Actions } from "@/types/Actions";
import { States } from "@/types/States";

export const StateReducer: (state: States, action: Actions) => States = (
  state,
  action,
) => {
  switch (action.type) {
    case "INCREASE_MUSIC_INDEX": {
      if (state.allMusics.length <= 1) return state;
      const currentIndex = state.allMusics.findIndex(
        (music) => music.id === state.musicID,
      );
      const nextIndex =
        currentIndex === state.allMusics.length - 1 ? 0 : currentIndex + 1;
      return {
        ...state,
        musicID: state.allMusics[nextIndex].id,
        isPlaying: false,
        playAfterChange: true,
      };
    }

    case "DECREASE_MUSIC_INDEX": {
      if (state.allMusics.length <= 1) return state;
      const currentIndex = state.allMusics.findIndex(
        (music) => music.id === state.musicID,
      );
      const prevIndex =
        currentIndex === 0 ? state.allMusics.length - 1 : currentIndex - 1;
      return {
        ...state,
        musicID: state.allMusics[prevIndex].id,
        isPlaying: false,
        playAfterChange: true,
        currentTime: 0,
      };
    }

    case "SET_MUSIC_ID": {
      if (state.allMusics.length === 0) return state;
      return {
        ...state,
        musicID: action.payload,
        isPlaying: false,
        playAfterChange: true,
      };
    }

    case "ADD_MUSIC": {
      const musicIndex = state.allMusics.findIndex(
        (music) => music.title === action.payload.title,
      );

      const isRepeatedMusic = musicIndex >= 0;

      // prevent adding duplicate music
      if (!isRepeatedMusic) {
        return {
          ...state,
          musicID:
            state.allMusics.length === 0 ? action.payload.id : state.musicID,
          playAfterChange: state.allMusics.length !== 0,
          allMusics: [...state.allMusics, action.payload],
        };
      }
      return state;
    }

    case "REMOVE_MUSIC": {
      if (state.allMusics.length > 0) {
        const newAllMusics = state.allMusics.filter(
          (music) => music.id !== action.payload,
        );
        const targetedMusic = state.allMusics.find(
          (music) => music.id === action.payload,
        );
        if (targetedMusic) {
          URL.revokeObjectURL(targetedMusic.image);
          URL.revokeObjectURL(targetedMusic.url);
        }
        if (state.musicID === action.payload) {
          const currentIndex = state.allMusics.findIndex(
            (music) => music.id === state.musicID,
          );
          const nextMusicIndex =
            state.allMusics.length - 1 === currentIndex
              ? state.allMusics.length >= 2
                ? state.allMusics.length - 2
                : 0
              : currentIndex + 1;
          state.musicID = state.allMusics[nextMusicIndex].id;
          state.allMusics = newAllMusics;
          state.currentTime = 0;
          state.isPlaying = false;
          state.playAfterChange = false;
          return { ...state };
        }

        state.allMusics = newAllMusics;

        return {
          ...state,
        };
      }
      return state;
    }

    case "EDIT_MUSIC_DETAILS": {
      const musicIndex = state.allMusics.findIndex(
        (music) => music.id === action.payload.id,
      );
      if (musicIndex >= 0) {
        Object.keys(action.payload).forEach((option) => {
          // @ts-ignore
          state.allMusics[musicIndex][option] = action.payload[option];
        });
      }
      return { ...state };
    }

    case "TOGGLE_PLAYING_MUSIC": {
      if (state.allMusics.length === 0) return state;
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    }

    case "PLAY_MUSIC": {
      if (state.allMusics.length === 0) return state;
      return {
        ...state,
        isPlaying: true,
      };
    }

    case "PAUSE_MUSIC": {
      if (state.allMusics.length === 0) return state;
      return {
        ...state,
        isPlaying: false,
      };
    }

    case "TOGGLE_SHUFFLE": {
      return {
        ...state,
        shuffle: !state.shuffle,
      };
    }

    case "CYCLE_REPEAT": {
      let repeat = state.repeat;
      if (repeat === "none") {
        repeat = "one";
      } else if (repeat === "one") {
        repeat = "all";
      } else {
        repeat = "none";
      }

      return {
        ...state,
        repeat,
      };
    }

    case "SET_REPEAT": {
      return {
        ...state,
        repeat: action.payload,
      };
    }

    case "SET_VOLUME": {
      if (!(action.payload > 100 || action.payload < 0)) {
        return {
          ...state,
          preVolume: state.volume === 0 ? state.preVolume : state.volume,
          volume: action.payload,
        };
      }
      return state;
    }

    case "SET_CURRENT_TIME": {
      if (state.allMusics.length > 0) {
        return {
          ...state,
          currentTime: action.payload,
        };
      }
      return state;
    }

    case "TOGGLE_PLAYING_VIEW": {
      return { ...state, showPlayingView: !state.showPlayingView };
    }

    case "CLOSE_PLAYING_VIEW": {
      return { ...state, showPlayingView: false };
    }

    default:
      return state;
  }
};
