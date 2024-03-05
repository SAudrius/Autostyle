"use client";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

export const LoadingPulse = () => {
  return (
    <div>
      <PulseLoader className="text-center" color="#000" />
    </div>
  );
};
