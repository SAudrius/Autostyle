"use client";
import Link from "next/link";
import React, { useEffect, useTransition } from "react";

import { isUserLoggedIn } from "@/actions/isLoggedIn";
import { Cart } from "@/components/layout/Header/MobileMenu/Cart";
import { CartMenu } from "@/components/layout/Header/MobileMenu/CartMenu";
import { Menu } from "@/components/layout/Header/MobileMenu/Menu";
import { Search } from "@/components/layout/Header/MobileMenu/Search";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { storeLogin } from "@/lib/store/slices/authSlice";
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
    searchAnimateOff,
    searchAnimateOn,
    searchOff,
    searchOn,
} from "@/lib/store/slices/searchSlice";
import {
    turnModalOff,
    turnModalOn,
} from "@/lib/store/storeHelpers/storeHelpers";

import { Account } from "./Account";
import { MenuOpen } from "./MenuOpen";
import { SearchMenu } from "./SearchMenu";

export const MobileMenu = () => {
    const dispatch = useAppDispatch();
    const search = useAppSelector( ( state ) => state.search.active );
    const isLoggedIn = useAppSelector( ( state ) => state.auth.isLoggedIn );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ isPending, startTransition ] = useTransition();

    useEffect( () => {
        startTransition( () => {
            const isLoggedInResponse = async () => {
                if ( await isUserLoggedIn() ) {
                    dispatch( storeLogin() );
                }
                return;
            };
            isLoggedInResponse();
        } );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    const handleMenu = () => {
        if ( search ) return;
        turnModalOn( dispatch, [ menuOn, menuAnimateOn ] );
    };
    const handleCart = () => {
        if ( search ) return;
        turnModalOn( dispatch, [ cartOn, cartAnimateOn ] );
    };

    const handleMenuClose = () => {
        turnModalOff( dispatch, [ menuAnimateOff ], [ menuOff ] );
    };

    const handleCartClose = () => {
        turnModalOff( dispatch, [ cartAnimateOff ], [ cartOff ] );
    };

    const handleSearch = () => {
        turnModalOn( dispatch, [ searchOn, searchAnimateOn ] );
    };

    const handleSearchClose = () => {
        turnModalOff( dispatch, [ searchAnimateOff ], [ searchOff ] );
    };

    return (
        <nav className="flex items-center gap-[6px] sm:gap-2 md:flex-grow md:gap-12 lg:gap-40">
            <div className="lg:flex-grow-1 flex justify-center md:flex-grow">
                <Search onClick={handleSearch} />
                <SearchMenu onClose={handleSearchClose} />
            </div>
            <div className="flex items-center justify-end gap-[6px] sm:gap-2 lg:w-[174px]">
                {isLoggedIn && <Account />}
                {!isLoggedIn && (
                    <span className="h-6 w-10 px-1 py-2 sm:px-2 lg:hidden"></span>
                )}
                <CartMenu onClose={handleCartClose} />
                {!isLoggedIn && (
                    <Link href="/auth/login" className="hidden text-sm lg:block">
                        Login
                    </Link>
                )}
                {!isLoggedIn && (
                    <Link href="/auth/register" className="hidden text-sm lg:block">
                        Register
                    </Link>
                )}
                <Cart onClick={handleCart} />
                <Menu onClick={handleMenu} />
                <MenuOpen onClose={handleMenuClose} />
            </div>
        </nav>
    );
};
