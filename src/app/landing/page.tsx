import Button from "@/components/atoms/Button/Button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative w-full aspect-[19/8] shrink-0 shadow-2xs shadow-dark-600 overflow-hidden">
        <Image
          src={"/images/landing.png"}
          alt="landing-bg"
          fill
          style={{ position: "absolute", objectFit: "cover", scale: "130%" }}
        />
        <div className="absolute inset-0 flex flex-col justify-center gap-9 max-xl:gap-7 max-lg:gap-5 max-md:gap-4 max-sm:gap-3 items-center bg-dark-900/80">
          <img
            src="/images/note.png"
            alt="note"
            className="size-25! bg-linear-to-tl from-dark-900 to-dark-600 rounded-full p-[1%] border-3! border-primary max-xl:size-20! max-lg:size-16! max-lg:border-2! max-md:border-1! max-md:size-12! max-md:p-[1%]! max-sm:size-9! max-sm:p-[1.4%]!"
          />
          <h1 className="text-4xl text-dark-100 max-xl:text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-[14px]">
            <span className="text-primary text-5xl max-xl:text-4xl max-lg:text-2xl max-md:text-xl max-sm:text-[16px]">
              Vibe
            </span>
            , Next Level of Music Player
          </h1>
          <Button
            variant="primary"
            className="text-xl! opacity-100! max-xl:text-lg! max-lg:text-sm! max-md:text-xs! max-sm:text-[10px]!"
            href="/library"
          >
            Get started
          </Button>
        </div>
      </div>
      <div className="container flex flex-col items-center py-30 max-xl:py-22 max-lg:py-14 max-md:py-10 max-sm:py-6 grow *:select-none!">
        <h2 className="text-5xl max-xl:text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl mb-10 max-xl:mb-8 max-lg:mb-6 max-md:mb-4 max-sm:mb-3 leading-[1.4] text-gradient bg-linear-0 from-secondary to-primary font-medium">
          Best Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-dark-200 max-md:justify-items-center">
          <div className="p-6 max-sm:p-3 bg-dark-700 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 border-1 border-dark-400 max-md:w-[70%] max-sm:w-[60%]">
            <h3 className="text-xl max-md:text-lg max-sm:text-sm mb-2 text-dark-100 text-center">
              🎵 Manage Local Musics
            </h3>
            <p className="text-md max-md:text-sm max-sm:text-xs text-center">
              Use your local musics from your device and manage all for you
            </p>
          </div>
          <div className="p-6 max-sm:p-3 bg-dark-700 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 border-1 border-dark-400 max-md:w-[70%] max-sm:w-[60%]">
            <h3 className="text-xl max-md:text-lg max-sm:text-sm mb-2 text-dark-100 text-center">
              📁 Playlist Management
            </h3>
            <p className="text-md max-md:text-sm max-sm:text-xs text-center">
              Organize your favorite tracks seamlessly across devices.
            </p>
          </div>
          <div className="p-6 max-sm:p-3 bg-dark-700 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 border-1 border-dark-400 max-md:w-[70%] max-sm:w-[60%]">
            <h3 className="text-xl max-md:text-lg max-sm:text-sm mb-2 text-dark-100 text-center">
              🚀 Offline Playback
            </h3>
            <p className="text-md max-md:text-sm max-sm:text-xs text-center">
              Enjoy your music anywhere without internet connection.
            </p>
          </div>
          <div className="p-6 max-sm:p-3 bg-dark-700 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 border-1 border-dark-400 max-md:w-[70%] max-sm:w-[60%]">
            <h3 className="text-xl max-md:text-lg max-sm:text-sm mb-2 text-dark-100 text-center">
              😁 Perfect User Experience
            </h3>
            <p className="text-md max-md:text-sm max-sm:text-xs text-center">
              Listen to your music with best UX and customable hotkeys
            </p>
          </div>
        </div>
      </div>
      <footer className="flex justify-center items-center w-full bg-dark-900 py-8 border-t-1 border-dark-600">
        <p className=" text-center text-dark-300 text-sm max-lg:text-xs">
          © 2025 Vibe Music Player. All rights reserved.
        </p>
      </footer>
    </>
  );
}
