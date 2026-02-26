"use client";
import { useAppState } from "@/contexts/StateContext";

import { delay } from "@/utils/delay";
import { fileInputHandler } from "@/utils/fileInputHandler";
import { FormEvent, RefObject } from "react";

export default function FileInput({
  inputRef,
}: {
  inputRef?: RefObject<HTMLInputElement>;
}) {
  const { state, dispatch } = useAppState();
  const inputHandler = async (e: FormEvent<HTMLInputElement>) => {
    const files = await fileInputHandler(e);
    if (!files) return;
    for (const file of files) {
      const isRepeatedMusic =
        state.allMusics.findIndex(
          (music) =>
            music.title === file.title.split(".").slice(0, -1).join("."),
        ) < 0;
      if (!isRepeatedMusic) continue;
      await delay(100);
      // state.allMusics.push(file);
      dispatch({ type: "ADD_MUSIC", payload: file });
    }
    (e.target as any).value = "";
  };
  return (
    <input
      className="hidden"
      type="file"
      onInput={(e) => inputHandler(e)}
      multiple
      accept=".mp3, .m4a, .ogg, .wav"
      ref={inputRef}
    />
  );
}
