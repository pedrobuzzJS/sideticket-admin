import "./MenuBarItem.scss";
import { useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { router } from "../../../../../main.tsx";

interface MenuBarItemProps {
    icon?: string;
    label?: string;
    path?: keyof typeof router.routesByPath;
    hasChildren: boolean;
    deepChildren?: MenuBarItemProps[];
}

export function MenuBarItem({ icon, label, path = "/", hasChildren, deepChildren }: MenuBarItemProps) {
    const navigate = useNavigate();

    const goTo = useCallback(async () => {
        await navigate({ to: `${path}` });
    }, [navigate, path]);

    return (
        <li className="menuBarItem" onClick={goTo}>
            <div className="menuItem">
                <div className="menuIconContainer">
                    <div className="menuIcon">
                        <i className={`${icon ?? "fa-regular fa-user"}`} />
                    </div>
                </div>
                <div className="menuItemDetails">
                    <div className="menuDetails">
                        <span className={`menuText`}>{`${label ?? ""}`}</span>
                    </div>
                    <div
                        className={`menuExpander ${!hasChildren && "menuExpanderHide"}`}
                    >
                        <i
                            style={{ color: "white" }}
                            className="fa-solid fa-chevron-down"
                        ></i>
                    </div>
                </div>
            </div>
        </li>
    );
}
