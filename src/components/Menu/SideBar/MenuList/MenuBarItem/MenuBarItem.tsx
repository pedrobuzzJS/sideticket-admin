import "./MenuBarItem.scss";
import { useCallback, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { router } from "../../../../../main.tsx";

export interface MenuBarItemProps {
    icon: string;
    label?: string;
    path?: keyof typeof router.routesByPath;
    deepChildren?: MenuBarItemProps[];
    hasChildren?: boolean;
}

export function MenuBarItem({
    icon,
    label,
    path,
    deepChildren = [],
}: MenuBarItemProps) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const hasChildren = deepChildren.length > 0;

    const handleClick = useCallback(async () => {
        if (hasChildren) {
            setOpen((prev) => !prev);
            return;
        }
        if (path) {
            await navigate({ to: path });
        }
    }, [hasChildren, navigate, path]);

    return (
        <li className={`menuBarItem ${open ? "open" : ""}`}>
            <div className="menuItem" onClick={handleClick}>
                <div className="menuIconContainer">
                    <div className="menuIcon">
                        <i className={icon ?? "fa-regular fa-user"} />
                        {/*<DynamicTablerIcon name={icon} />*/}
                    </div>
                </div>

                <div className="menuItemDetails">
                    <div className="menuDetails">
                        <span className="menuText">{label}</span>
                    </div>

                    {hasChildren && (
                        <div className="menuExpander">
                            <i className="fa-solid fa-chevron-down" />
                        </div>
                    )}
                </div>
            </div>

            {hasChildren && open && (
                <ul className="submenu">
                    {deepChildren.map((child, index) => (
                        <MenuBarItem
                            key={index}
                            label={child.name}
                            path={child.route}
                            icon={child.icon}
                            deepChildren={child.deepChildren}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}
