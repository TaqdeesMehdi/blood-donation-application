"use client";

import { useState } from "react";
import { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";
import Image from "next/image";

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");
  return (
    <div className="h-screen w-full flex">
      {/* Left Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* App Title */}
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-bold text-red-700">
              Blood Donation App
            </h1>
            <p className="text-sm text-muted-foreground">
              Saving lives, one donation at a time
            </p>
          </div>

          {/* Auth Forms */}
          <div className="w-full">
            {state === "signIn" ? (
              <SignInCard setState={setState} />
            ) : (
              <SignUpCard setState={setState} />
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-red-50">
        <Image
          src="/ui.png"
          alt="Blood Donation"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};
