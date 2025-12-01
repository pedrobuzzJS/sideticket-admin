import type { PropsWithChildren } from "react";
import "./ContentLayout.scss";
import { useMenuStore } from "../../stores/menuStore.tsx";
import { MenuBar } from "../Menu/MenuBar/MenuBar.tsx";

export function ContentLayout({ children }: PropsWithChildren) {
    const { superOpenSideBar } = useMenuStore();
    return (
        <div className={`contentLayout ${superOpenSideBar ? "open" : ""}`}>
            <MenuBar />
            <div className="mainContent">{children}</div>
        </div>
    );
}
