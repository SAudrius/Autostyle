"use client";
import React, { useState } from "react";

import { Cart } from "@/components/layout/Header/HeaderIcons/Cart";
import { CartMenu } from "@/components/layout/Header/HeaderIcons/Cart/CartMenu";
import { Menu } from "@/components/layout/Header/HeaderIcons/Menu";
import { Search } from "@/components/layout/Header/HeaderIcons/Search";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { off, on } from "@/lib/store/slices/modalSlice";

import { MenuOpen } from "./Menu/MenuOpne";

export const HeaderIcons = () => {
  const [cartOn, setCartOn] = useState<boolean>(false);
  const [menuOpenOn, setMenuOpenOn] = useState<boolean>(false);
  const modal = useAppSelector((state) => state.modal.value);
  const dispatch = useAppDispatch();
  // if modal is turn off then cart is off
  if (!modal && cartOn) {
    setCartOn(false);
  }
  if (!modal && menuOpenOn) {
    setMenuOpenOn(false);
  }

  const handleMenu = () => {
    console.log("menu");
    dispatch(on());
    setMenuOpenOn(true);
  };
  const handleMenuClose = () => {
    console.log("menu");
    dispatch(on());
    setMenuOpenOn(false);
  };

  const handleCartClose = () => {
    dispatch(off());
    setCartOn(false);
  };

  const handleCart = () => {
    console.log("cartOn ===", cartOn);
    if (cartOn) {
      console.log("TRUE");
      console.log("off");
      dispatch(off());
      setCartOn(false);
    } else {
      console.log("on");
      dispatch(on());
      setCartOn(true);
    }
  };

  return (
    <nav className="flex items-center gap-3">
      <Search />
      <Cart onClick={handleCart} />
      <Menu onClick={handleMenu} />
      <CartMenu cartOn={cartOn} onClose={handleCartClose} />
      <MenuOpen menuOpenOn={menuOpenOn} onClose={handleMenuClose} />
    </nav>
  );
};
