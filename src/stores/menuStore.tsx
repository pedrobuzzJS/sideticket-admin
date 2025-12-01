import { create } from "zustand";
// import {Router} from "@tanstack/react-router";
// import type { UseNavigateResult } from "@tanstack/react-router";
import { type AppRouter } from "../main.tsx";

interface MenuProps {
    superOpenSideBar: boolean;
    isSideBarOpen: boolean;
    toggleSideBar: () => void;
    handleSideBar: (open: boolean) => void;
    getCurrentPath: () => string;
    currentPath: string;
    getQueryParams: () => object;
    queryParams: object;
    router: AppRouter;
}

export interface TabProps {
    label: string;
    itemIndex: number;
    active: boolean;
    path?: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const useMenuStore = create<MenuProps>()((set, get) => {
    return {
        isSideBarOpen: false,
        superOpenSideBar: false,
        toggleSideBar: () => {
            set({ isSideBarOpen: !get().superOpenSideBar });
            set({ superOpenSideBar: !get().superOpenSideBar });
        },
        handleSideBar: (open: boolean) => {
            if (get().superOpenSideBar) {
                return;
            }
            set({ isSideBarOpen: open });
        },
    };
});
