import React from "react";

import { BackButton } from "@/app/auth/_components/BackButton";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components";
import { montserrat } from "@/config";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription: string;
  backButtonText: string;
  backButtonAttribute: string;
}

export const CardWrapper = ( {
    children,
    headerLabel,
    headerDescription,
    backButtonText,
    backButtonAttribute,
}: CardWrapperProps ) => {
    return (
        <Card className="box-border w-[600px] border-none bg-neutral-000 drop-shadow-[0px_2px_6px_rgba(0,0,0,0.25)]">
            <CardHeader className="p-8">
                <CardTitle
                    className={`text-center text-lg font-normal uppercase tracking-[3.6px] drop-shadow-[1px_0px_2px_rgba(0,0,0,0.25)] ,${montserrat.className}`}
                >
                    {headerLabel}
                </CardTitle>
                <CardDescription className="text-center tracking-[0.6px]">
                    {headerDescription}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">{children}</CardContent>
            <CardFooter className="justify-center p-8 pt-0">
                <BackButton link={backButtonAttribute}>{backButtonText}</BackButton>
            </CardFooter>
        </Card>
    );
};
