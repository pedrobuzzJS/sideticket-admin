import styles from "./SideBar.module.scss";
import { useMenuStore } from "../../../stores/menuStore.tsx";
import { MenuList } from "./MenuList/MenuList.tsx";

export function SideBar() {
    const { isSideBarOpen, toggleSideBar, handleSideBar } = useMenuStore();

    return (
        <>
            <aside
                className={`${styles.sideBar} ${
                    isSideBarOpen ? styles.open : styles.sideBar
                }`}
            >
                <div
                    className={`${styles.sideBarHeader} ${
                        isSideBarOpen ? styles.open : styles.sideBarHeader
                    }`}
                    onClick={toggleSideBar}
                >
                    {/*<i className="pi pi-bars" style={{ fontSize: "2rem" }}></i>*/}
                </div>
                <div
                    className={`${styles.list} ${isSideBarOpen ? styles.listOpen : ""}`}
                    onMouseOver={() => handleSideBar(true)}
                    onMouseLeave={() => handleSideBar(false)}
                >
                    <div
                        style={{
                            display: "block",
                            height: "60px",
                        }}
                    />
                    <div
                        style={{
                            height: "100%",
                            width: "100%",
                        }}
                    >
                        <MenuList />
                    </div>
                </div>
                <div
                    style={{
                        position: "absolute",
                        zIndex: 100,
                        left: 0,
                        top: "50px",
                        width: "60px",
                    }}
                ></div>
            </aside>
        </>
    );
}
