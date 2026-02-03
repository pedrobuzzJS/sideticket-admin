import styles from "./SideBar.module.scss";
import { useMenuStore } from "../../../stores/menuStore.tsx";
import { MenuList } from "./MenuList/MenuList.tsx";
import {DynaicIcon} from "../../../icons.tsx";

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
                    // onClick={toggleSideBar}
                >
                   <DynaicIcon 
                       name="Ticket"
                       fontSize="30"
                       color="#ffffff"
                       stroke="10"
                   />
                </div>
                <div
                    className={`${styles.sideBarFooter} ${
                        isSideBarOpen ? styles.open : styles.sideBarFooter
                    }`}
                    onClick={toggleSideBar}
                >
                    <DynaicIcon name={"AnglesRight"} fontSize={25} />
                </div>
                <div
                    className={`${styles.list} ${isSideBarOpen ? styles.listOpen : ""}`}
                    onMouseOver={() => handleSideBar(true)}
                    onMouseLeave={() => handleSideBar(false)}
                >
                    <div
                        style={{
                            display: "block",
                            height: "50px",
                        }}
                    />
                    <div
                        style={{
                            height: "100%",
                            width: "100%",
                            overflowX: "hidden",
                        }}
                    >
                        <div className={styles.testeCoisa}>
                            <MenuList />
                        </div>
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
