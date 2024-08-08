import { Button } from "@components/ui/button";
import { nunito } from "@config/fonts";
import { cn } from "@config/utils";
import React from "react";

export const EmptyOrders = () => {
    return (
        <div className="">
            <h3 className={cn( "mt-6 text-base", nunito.className )}>
                You do not have any orders yet
            </h3>
            <Button className="mt-4 font-normal hover:font-medium" variant="secondary" size="lg">
                Discover products
            </Button>
        </div>
    );
};
