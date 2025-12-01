import "./MenuBarItem.scss";
import { useMenuStore } from "../../../../../stores/menuStore.tsx";

export function MenuBarItem() {
    const { isSideBarOpen } = useMenuStore();
    return (
        <li className="menuBarItem">
            <div className="menuItem">
                <div className="menuIcon">
                    <i
                        className="fa-regular fa-user"
                        style={{ color: "white" }}
                    />
                </div>
                {/*<div className="menuItemDetails">*/}
                <div
                    className={`menuItemDetails ${isSideBarOpen ? "menuItemDetailsOpen" : ""}`}
                >
                    <span>Principal</span>
                </div>
            </div>
        </li>
    );
}
