import { FormEvent } from "react";
import getAudioMetadata from "./getAudioMetadata";

export const fileInputHandler = async (e: FormEvent<HTMLInputElement>) => {
  if (!(e.target as HTMLInputElement).files?.length) return;
  const files = (e.target as HTMLInputElement).files;
  const result = [];
  if (!files || !files.length) return;
  for (const file of files) {
    const { error, metadata } = await getAudioMetadata(file as File);
    if (error || !metadata) {
      console.log("Failed to load files:", error);
    } else {
      result.push(metadata);
    }
  }
  (e.target as any).value = "";
  return result;
};
