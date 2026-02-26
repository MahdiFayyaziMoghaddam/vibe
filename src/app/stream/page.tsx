"use client";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Member from "@/components/organisms/Member";
import Owner from "@/components/organisms/Owner";
import React, { useState } from "react";

export type State = "member" | "owner" | null;

export default function Stream() {
  // const [state, setState] = useState<State>(null);
  // const [joinInput, setJoinInput] = useState("");

  // if (state === "owner") return <Owner setState={setState} />;

  // if (state === "member") return <Member setState={setState} />;

  return (
    <>
      <h2 className="mx-auto self-center mt-72 text-3xl max-md:mt-62 max-sm:mt-55 max-sm:text-2xl text-primary select-none">
        Coming soon ...
      </h2>
      {/* <div className="m-auto">
        <div className="flex gap-4">
          <Input
            value={joinInput}
            placeholder="Room ID"
            onChange={(e) => setJoinInput(e.target.value)}
          />
          <Button
            variant="primary"
            onClick={() => {
              if (!joinInput) return;
              setJoinInput("");
              setState("member");
            }}
          >
            Join
          </Button>
        </div>
        <p className="text-center my-6 text-2xl">or</p>
        <Button
          variant="gray"
          className="py-1.5!"
          onClick={() => setState("owner")}
        >
          Create a room
        </Button>
      </div> */}
    </>
  );
}
