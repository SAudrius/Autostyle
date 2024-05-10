"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { CancelIcon, Line } from "@/components/ui/custom";
import { nunito } from "@/config/fonts";
import { cn } from "@/config/utils";
import { useAppSelector } from "@/lib/hooks";

interface CartMenuProps {
  onClose: () => void;
}

export const CartMenu = ({ onClose }: CartMenuProps) => {
  const cart = useAppSelector((state) => state.cart.value);
  const cartAnimation = useAppSelector((state) => state.cart.cartAnimation);
  return (
    <div
      className={cn(
        "absolute right-0 top-0 z-10 box-border h-screen w-[350px] translate-x-0 overflow-x-hidden bg-neutral-000 transition duration-300",
        { "-z-20": !cart },
        {
          "z-40": cart,
        },
        { "z-40 translate-x-0": cartAnimation },
        { "z-40 translate-x-[350px]": !cartAnimation },
      )}
    >
      <div className="grid h-full grid-rows-[80.5px,1fr,128px]">
        <div className="grid self-start">
          <div className="flex justify-between px-4 py-[30px]">
            <h3
              className={cn(
                "uppercase leading-[19.5px] tracking-normal ",
                nunito.className,
              )}
            >
              Cart
            </h3>
            <CancelIcon className="cursor-pointer" onClick={onClose} />
          </div>
          <Line />
        </div>
        <div className="flex items-center justify-center px-4 pt-5">
          <p>Your cart is empty</p>
        </div>

        <div className="grid h-auto w-full self-end px-4 py-5">
          <div className="grid w-full gap-y-3">
            <Button size="full">Continue Shopping</Button>
            <Button variant="secondary" size="full">
              CHECKOUT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
