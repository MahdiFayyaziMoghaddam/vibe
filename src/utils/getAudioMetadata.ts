import { IAudioMetadata, parseBlob } from "music-metadata";
import { AudioMetadata } from "../types/AudioMetadata";

interface SetAudioMetadataResponse {
  error?: string | null;
  metadata?: AudioMetadata | null;
}

export default async function getAudioMetadata(
  file: File,
): Promise<SetAudioMetadataResponse> {
  try {
    const musicMetadata: IAudioMetadata = await parseBlob(file);
    const musicURL: string = URL.createObjectURL(file);
    let musicImgURL: string = "";

    if (musicMetadata.common?.picture && musicMetadata.common.picture[0]) {
      const musicImg = musicMetadata.common.picture[0];
      const musicImgBlob = new Blob([musicImg.data as BlobPart], {
        type: musicImg.format,
      });
      musicImgURL = URL.createObjectURL(musicImgBlob);
    }

    const audioMetadata: AudioMetadata = {
      id: Math.floor(Math.random() * 1000000),
      title:
        musicMetadata.common?.title?.trim() ||
        file.name.split(".").slice(0, -1).join(".") ||
        "Unknown Title",
      artists: musicMetadata.common?.artists?.join(",") || "Unknown Artist",
      album: musicMetadata.common?.album?.trim() || "Unknown Album",
      duration: musicMetadata.format.duration || 0,
      image: musicImgURL,
      url: musicURL,
      size:
        file.size / 1024 / 1024 > 1024
          ? `${(file.size / 1024 / 1024 / 1024).toFixed(2)} GB`
          : file.size / 1024 > 1024
            ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
            : `${(file.size / 1024).toFixed(2)} KB`,
    };
    return { metadata: audioMetadata };
  } catch (err: any) {
    return { error: `Error in parsing ${file.name}: ${err.message}` };
  }
}
