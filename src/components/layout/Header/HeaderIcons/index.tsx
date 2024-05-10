"use client";
import React from "react";

import { Cart } from "@/components/layout/Header/HeaderIcons/Cart";
import { CartMenu } from "@/components/layout/Header/HeaderIcons/CartMenu";
import { Menu } from "@/components/layout/Header/HeaderIcons/Menu";
import { Search } from "@/components/layout/Header/HeaderIcons/Search";
import { useAppDispatch } from "@/lib/hooks";
import {
  cartAnimateOff,
  cartAnimateOn,
  cartOff,
  cartOn,
} from "@/lib/store/slices/cartSlice";
import {
  menuAnimateOff,
  menuAnimateOn,
  menuOff,
  menuOn,
} from "@/lib/store/slices/menuSlice";
import {
  modalAnimateOff,
  modalAnimateOn,
  modalOff,
  modalOn,
} from "@/lib/store/slices/modalSlice";

import { MenuOpen } from "./MenuOpen";

export const HeaderIcons = () => {
  const dispatch = useAppDispatch();

  const handleMenu = () => {
    dispatch(menuOn());
    dispatch(modalOn());
    dispatch(menuAnimateOn());
    dispatch(modalAnimateOff());
  };
  const handleCart = () => {
    dispatch(cartOn());
    dispatch(modalOn());
    dispatch(cartAnimateOn());
    dispatch(modalAnimateOff());
  };

  const handleMenuClose = () => {
    dispatch(menuAnimateOff());
    dispatch(modalAnimateOff());
    new Promise((resolve) => setTimeout(resolve, 300)).then(() => {
      dispatch(modalOff());
      dispatch(menuOff());
    });
  };

  const handleCartClose = () => {
    dispatch(cartAnimateOff());
    dispatch(modalAnimateOn());
    new Promise((resolve) => setTimeout(resolve, 300)).then(() => {
      dispatch(modalOff());
      dispatch(cartOff());
    });
  };

  return (
    <nav className="flex items-center gap-3">
      <Search />
      <Cart onClick={handleCart} />
      <Menu onClick={handleMenu} />
      <CartMenu onClose={handleCartClose} />
      <MenuOpen onClose={handleMenuClose} />
    </nav>
  );
};
