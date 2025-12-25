import { create } from "zustand";
import { type AppRouter } from "../main.tsx";
import { delayAndRun } from "../helpers/helpers.ts";

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
            delayAndRun(() => {
                if (get().superOpenSideBar) {
                    return;
                }
                set({ isSideBarOpen: open });
            }, 100);
        },
    };
});
