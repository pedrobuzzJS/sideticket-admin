import "./MenuList.scss";
import { MenuBarItem } from "./MenuBarItem/MenuBarItem.tsx";

export function MenuList() {
    return (
        <ul className="menuList">
            <MenuBarItem />
        </ul>
    );
}
