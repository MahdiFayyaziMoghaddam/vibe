"use client";
import { Slider as S } from "@base-ui-components/react";
import React, { memo, useState, useMemo, useCallback, useEffect } from "react";
import durationFormatter from "@/utils/durationFormatter";

interface ISliderProps {
  value?: number;
  max?: number;
  min?: number;
  disable?: boolean;
  scrollLock?: boolean;
  className?: string;
  step?: number;
  scrollStepTimes?: number;
  onChange?: (v: number) => void;
  formattedLabel?: boolean;
  noLabel?: boolean;
}

const Slider = function Slider({
  value: val = 0,
  disable = false,
  max = 1,
  min = 0,
  className,
  step = 1,
  scrollStepTimes = 5,
  scrollLock = false,
  formattedLabel = false,
  noLabel = false,
  onChange = (v: number) => null,
}: ISliderProps) {
  const value = useMemo(() => val, [val]);
  const [isHover, setIsHover] = useState<{
    value: number;
    phase: "change" | "none";
  }>({ value: 0, phase: "none" });

  useEffect(() => {
    const id = setTimeout(() => {
      if (isHover.phase === "change") {
        setIsHover({ value: 0, phase: "none" });
      }
    }, 1000);
    return () => clearTimeout(id);
  }, [isHover]);

  return (
    <S.Root
      max={max}
      min={min}
      value={value}
      onValueChange={(e) => {
        onChange(e);
        setIsHover((prev) => ({ value: prev.value + 1, phase: "change" }));
      }}
      autoFocus={false}
      onFocus={(e) => e.currentTarget.blur()}
      step={step}
      onMouseOver={() => setIsHover({ value: 1, phase: "none" })}
      onMouseLeave={() => {
        setIsHover({ value: 0, phase: "none" });
      }}
      onWheel={(e) => {
        if (!disable && !scrollLock) {
          if (e.deltaY >= 0) {
            onChange(
              value >= scrollStepTimes * step
                ? value - scrollStepTimes * step
                : 0,
            );
          } else {
            onChange(
              value + scrollStepTimes * step <= max
                ? value + scrollStepTimes * step
                : max,
            );
          }
        }
      }}
    >
      <S.Control
        className={`flex items-center w-[12rem] select-none cursor-pointer ${className}`}
        onFocus={(e) => e.target.blur()}
      >
        <S.Track className="h-1 max-md:h-[3px] w-full bg-dark-400 rounded-2xl select-none my-[0.2rem]">
          <S.Indicator className="bg-primary rounded-2xl select-none" />
          <S.Thumb
            className="relative flex justify-center size-[0.7rem] max-lg:size-[0.6rem] max-md:size-[0.6rem] max-sm:size-[0.5rem] rounded-full bg-dark-100 select-none focus-visible:outline focus-visible:outline-blue-800"
            onFocus={(e) => e.preventDefault()}
          >
            {!noLabel && isHover.value ? (
              <div className="absolute bottom-[1.5em] border-1 border-dark-300 px-[0.4em] bg-dark-600 text-dark-200 text-[0.7rem] max-md:text-[0.6rem] max-sm:text-[0.5rem] rounded-[0.3em] cursor-auto">
                {formattedLabel ? durationFormatter(value) : value}
              </div>
            ) : null}
          </S.Thumb>
        </S.Track>
      </S.Control>
    </S.Root>
  );
};

export default Slider;
