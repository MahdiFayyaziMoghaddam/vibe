"use client";

import { memo, useState } from "react";
import { IoPlay } from "react-icons/io5";
import durationFormatter from "@/utils/durationFormatter";
import { RiPlayListAddFill } from "react-icons/ri";
import { MdQueue } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import Equalizer from "@/components/atoms/Equalizer/Equalizer";
import Tooltip from "@/components/atoms/Tooltip/Tooltip";
import Button from "@/components/atoms/Button/Button";
import { useToast } from "@/contexts/ToastContext";
import { useAppState } from "@/contexts/StateContext";
import Image from "@/components/atoms/Image/Image";

interface ITableRowProps {
  id: number;
  imgSrc?: string;
  title: string;
  authors?: string;
  album?: string;
  duration?: number;
  number?: number;
  selected?: boolean;
}

function TableRow({
  id,
  title,
  album = "",
  authors = "",
  duration = 0,
  imgSrc = "",
  number = 100,
  selected = false,
}: ITableRowProps) {
  const [isHover, setIsHover] = useState(false);
  const { state, dispatch } = useAppState();
  const setToast = useToast();

  return (
    <>
      <tr
        className={`px-5 *:py-2 *:shrink-0 duration-100 text-sm text-dark-200 gap-2 backdrop-blur-2xl ${
          selected
            ? "bg-primary/10! hover:bg-primary/10! *:border-primary/90! *:border-y-[1.8px]! *:first:border-l-[1.8px]! *:last:border-r-[1.8px]! max-md:*:last:border-r-0! max-md:*:first:border-l-0!"
            : "bg-dark-900! hover:bg-dark-600/75!"
        } max-sm:border-none!`}
        onMouseOver={() => !selected && setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        id={`${id}`}
      >
        <td className="max-md:hidden">
          <div className="flex-center text-[0.78rem] shrink-0 *:shrink-0 leading-[1] pr-[1px]">
            {selected ? (
              state.isPlaying ? (
                <Equalizer className="*:bg-primary/70" />
              ) : (
                <span className="text-primary">{number + 1}</span>
              )
            ) : isHover ? (
              <>
                {/* <Tooltip title={`Play ${title}`} placement="top"> */}
                <Button
                  variant="icon"
                  className="p-[4px]! max-lg:p-[3.5px]! max-md:p-[3px]!"
                  title={`Play ${title}`}
                  onClick={() =>
                    dispatch({ type: "SET_MUSIC_ID", payload: id })
                  }
                >
                  <IoPlay className="text-[1.1rem] max-lg:text-[1.05rem] max-md:text-[1rem]" />
                </Button>
                {/* </Tooltip> */}
              </>
            ) : (
              number + 1
            )}
          </div>
        </td>
        <td className="py-2 max-md:px-2">
          <div className="max-md:hidden flex items-center gap-2.5">
            <Image
              className="size-[2.5rem]! aspect-square! rounded-[0.2rem] overflow-hidden shadow-[0px_0px_1px_0px] shadow-dark-100"
              src={imgSrc}
              alt={title}
            />
            <div className="flex flex-col grow">
              <p
                className="text-[0.8rem] text-dark-200 line-clamp-1 leading-[1.6]"
                title={title}
              >
                {title}
              </p>
              <p
                className="text-[0.65rem] text-dark-200/60 line-clamp-1 leading-[1.6]"
                title={authors}
              >
                {authors}
              </p>
            </div>
          </div>
          {/* smaller than md size */}
          <div
            className="hidden max-md:flex items-center gap-1.5"
            onClick={() => dispatch({ type: "SET_MUSIC_ID", payload: id })}
          >
            <Image
              className="size-[2.5rem]! max-sm:size-[2.1rem]! aspect-square! rounded-[0.2rem] overflow-hidden shadow-[0px_0px_1px_0px] shadow-dark-100"
              src={imgSrc}
              alt={title}
            />
            <div className="flex flex-col grow">
              <p
                className="text-[0.8rem] max-sm:text-[0.65rem] text-dark-200 line-clamp-1 leading-[1.6]"
                title={title}
              >
                {title}
              </p>
              <p
                className="text-[0.65rem] max-sm:text-[0.5rem] text-dark-200/60 line-clamp-1 leading-[1.6]"
                title={authors}
              >
                {authors}
              </p>
            </div>
          </div>
        </td>
        <td className="p-1 text-[0.8rem] text-center max-sm:text-[0.6rem]">
          <p className="line-clamp-1" title={album}>
            {album}
          </p>
        </td>
        <td className="p-1 text-[0.8rem] text-center max-sm:hidden">
          <p className="line-clamp-1">{durationFormatter(duration)}</p>
        </td>
        <td className="p-1 max-sm:p-0.5 text-right">
          <div className="max-md:hidden flex justify-center items-center gap-3 w-full max-sm:gap-1 *:shrink-0">
            {isHover || selected ? (
              <>
                <Button
                  variant="primary"
                  className="p-1! max-sm:p-0.5!"
                  title="Remove"
                  onClick={() => {
                    state.musicID === id && dispatch({ type: "PAUSE_MUSIC" });
                    dispatch({ type: "REMOVE_MUSIC", payload: id });
                  }}
                >
                  <IoMdTrash className="text-lg" />
                </Button>
              </>
            ) : null}
          </div>
          {/* small size */}
          <div className="hidden max-md:flex justify-center items-center gap-3 w-full max-sm:gap-1 *:shrink-0">
            <Button
              variant="primary"
              className="p-1! max-sm:p-0.6!"
              title="Remove"
              onClick={() => {
                state.musicID === id && dispatch({ type: "PAUSE_MUSIC" });
                dispatch({ type: "REMOVE_MUSIC", payload: id });
              }}
            >
              <IoMdTrash className="text-lg max-sm:text-sm" />
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default memo(TableRow);
