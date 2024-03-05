"use client";

import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

import { fetchGoogleCode } from "@/actions/google";
import { FormError, FormSuccess } from "@/components/ui/custom";

export const GoogleVerify = () => {
  const [success, setSuccess] = useState<undefined | string>("");
  const [error, setError] = useState<undefined | string>("");
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const onSubmit = useCallback(() => {
    if (!code) {
      setError("Mising token");
      return null;
    }
    fetchGoogleCode(code)
      .then((data) => {
        console.log("data ===", data);
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => setError("Somethink went wrong"));
  }, [code]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="gird col-span-1">
      {!success && !error && (
        <PulseLoader className="text-center" color="#000" />
      )}
      <FormSuccess message={success} />
      {!success && <FormError message={error} />}
    </div>
  );
};
