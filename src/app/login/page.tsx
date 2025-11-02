"use client";
import Button from "@/components/atoms/Button/Button";
import Image from "@/components/atoms/Image/Image";
import Input from "@/components/atoms/Input/Input";
import Link from "@/components/atoms/Link/Link";
import React, { ChangeEvent, useEffect, useState } from "react";

type TUser = { username: string; password: string };
type TValues = {
  username: string;
  password: string;
};

export default function Login() {
  return (
    <>
      <div className="relative flex justify-center items-center grow">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[url('/images/login-background.gif')] bg-cover bg-no-repeat"></div>
        <form className="flex flex-col items-center bg-dark-700/60 border-1 border-dark-700/60 pt-6 pb-8 z-10 shadow-2xl shadow-dark-900 w-80 backdrop-blur-xs rounded-sm">
          <h1 className="text-3xl italic font-bold text-gradient bg-linear-135 from-primary to-secondary select-none">
            Login
          </h1>
          <Input
            className="text-md! mt-8"
            placeholder="Username:"
            name="username"
          />

          <p className="text-primary text-[0.8rem] mt-1 w-full"></p>
          <Input
            className="text-md! mt-8"
            placeholder="Password:"
            name="password"
            type="password"
          />
          <p className="text-primary text-[0.8rem] mt-1 w-full"></p>
          <p className="mt-10 text-sm text-dark-200">
            Don't have any account?
            <Link href="/register" className="ml-1 text-primary">
              Register
            </Link>
          </p>
          <Button variant="primary" className="mt-5 text-[0.9rem]!">
            Login
          </Button>
        </form>
      </div>
    </>
  );
}
