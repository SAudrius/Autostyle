"use client";
import React from "react";

import { montserrat, nunito } from "@/config/fonts";
import { cn } from "@/config/utils";

interface UserInfoFieldProps {
  field: string;
  value: string;
  linkLabel?: string | null;
  linkHref?: string | null;
  className?: string;
  infoValues?: string;
}

export const UserInfoField = ({
  field,
  value,
  linkLabel = null,
  linkHref = null,
  infoValues,
  className,
}: UserInfoFieldProps) => {
  const isEmail = field.toLowerCase() === "email";
  const handleSubmit = (values: string) => {
    console.log("Info values");
    console.log(values);
  };

  return (
    <div>
      <p
        className={cn(
          "tracking-wide-6 text-lg capitalize leading-6",
          montserrat.className,
          { lowercase: isEmail },
          {
            [className as string]: className,
          },
        )}
      >
        <span
          className={cn(
            "tracking-wide-6 font-medium uppercase",
            nunito.className,
          )}
        >
          {field}:{" "}
        </span>
        {value}
      </p>
      {linkLabel && linkHref && (
        <a
          className={cn(
            "tracking-wide-12 mt-1 inline-block caption-top underline",
            montserrat.className,
          )}
          href={linkHref}
        >
          {linkLabel}
        </a>
      )}
      {infoValues && (
        <button
          type="button"
          onClick={() => handleSubmit(infoValues)}
          className={cn(
            "tracking-wide-12 mt-1 inline-block caption-top cursor-pointer underline",
            montserrat.className,
          )}
        >
          Change info
        </button>
      )}
    </div>
  );
};
