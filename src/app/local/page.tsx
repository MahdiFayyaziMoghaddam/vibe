"use client";
import Table from "@/components/molecules/Table/Table";
import TableRow from "@/components/molecules/Table/TableRow";
import { useAppState } from "@/contexts/StateContext";

export default function Local() {
  const { state } = useAppState();
  return (
    <>
      <Table
        title="Title"
        description="Description"
        imgSrc="/images/paint.jpg"
        className="my-5 max-md:my-0! mx-auto"
        columns={
          <>
            <th className="w-8 max-md:hidden">#</th>
            <th className="w-80 text-left">Title</th>
            <th className="w-60">Album</th>
            <th className="w-30 max-sm:hidden">Duration</th>
            <th className="w-40">Actions</th>
          </>
        }
        rows={state.allMusics.map((music, index) => (
          <TableRow
            id={music.id}
            key={music.id}
            duration={music.duration}
            number={index}
            title={music.title}
            album={music.album}
            authors={music.artists}
            imgSrc={music.image}
            selected={music.id === state.musicID}
          />
        ))}
      />
      {/* <div className="fixed bottom-0 w-full">
        <Controls />
      </div> */}
    </>
  );
}
