
import { useAppDispatch } from "@lib/hooks";
import { turnPopupAndModalOff } from "@lib/store/storeHelpers/storeHelpers";
import React, { useState } from "react";

import { ChangeDetailsFormSection } from "./_components/ChangeDetailsFormSection";
import { ChangeDetailsSuccessSection } from "./_components/ChangeDetailsSuccessSection";

export const ChangeDetailsPopup = () => {
    const dispatch = useAppDispatch();

    const [ changeDetailsSuccess, setChangeDetailsSuccess ] = useState( false )

    const handleCancel = () => {
        turnPopupAndModalOff( dispatch );
    };


    const handelComplete = () => {
        location.reload();
        handleCancel()
    }

    return (
        <div className="inline-block w-[400px] rounded bg-neutral-100 p-8">
            {!changeDetailsSuccess && <ChangeDetailsFormSection setChangeDetailsSuccess={setChangeDetailsSuccess} />}
            {changeDetailsSuccess && <ChangeDetailsSuccessSection handleComplete={handelComplete} />}
        </div>
    );
};
