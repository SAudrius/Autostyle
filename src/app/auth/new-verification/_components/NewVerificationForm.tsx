"use client";

import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

// import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/ui/custom/FormError";
import { FormSuccess } from "@/components/ui/custom/FormSuccess";

export const NewVerificationForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [success, setSuccess] = useState<undefined | string>("");
  const [error, setError] = useState<undefined | string>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Mising token");
      return null;
    }
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="gird col-span-1 ">
      {!success && !error && (
        <PulseLoader className="text-center" color="#000" />
      )}
      <FormSuccess message={success} />
      {!success && <FormError message={error} />}
    </div>
  );
};
