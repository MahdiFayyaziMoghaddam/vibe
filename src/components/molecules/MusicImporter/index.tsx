import Button from "@/components/atoms/Button/Button";
import FileInput from "@/components/atoms/Input/FileInput";
import { AudioMetadata } from "@/types/AudioMetadata";
import React from "react";
import { HiOutlineDownload } from "react-icons/hi";
type Props = {
  onImport: (metadataList: AudioMetadata[]) => void;
};
export default function MusicImporter() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <FileInput inputRef={inputRef as React.RefObject<HTMLInputElement>} />
      <Button
        variant="primary"
        title="Import Music"
        className="text-2xl! p-1.5! max-md:p-1! max-md:rounded-md max-sm:text-lg! max-sm:p-0.6! max-sm:rounded-sm!"
        onClick={() => inputRef.current?.click()}
      >
        <HiOutlineDownload />
      </Button>
    </>
  );
}
