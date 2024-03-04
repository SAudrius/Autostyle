import React from "react";

import Socials from "@/app/auth/_components/Socials";
import { Button } from "@/components/ui/button";
import { LoadingInputField } from "@/components/ui/custom/LoadingInputField";
import { LoadingLabel } from "@/components/ui/custom/LoadingLabel";

export const LoadingLogin = () => {
  return (
    <div>
      <div className="mt-4 space-y-2">
        <LoadingLabel>NewPassword</LoadingLabel>
        <LoadingInputField />
      </div>
      <Socials loading />
      <Button
        disabled
        className="mt-4"
        variant="loading"
        type="button"
        size="full"
      >
        Submit
      </Button>
    </div>
  );
};
