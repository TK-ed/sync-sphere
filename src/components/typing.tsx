"use client";
import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          `Welcome to Sync.Sphere`,
          "New-gen Cloud Storage",
          "Powered by Next.js and Supabase",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 69,
        cursor: "_",
      }}
    />
  );
}

export default Type;
