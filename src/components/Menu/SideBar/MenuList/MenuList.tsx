import "./MenuList.scss";
import { MenuBarItem } from "./MenuBarItem/MenuBarItem.tsx";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../services/api.ts";

export function MenuList() {
    const menuQuery = useQuery({
        queryKey: ["nestedmenu"],
        queryFn: async () => {
            const { data } = await api.get("nestedmenu");
            return data;
        },
    });
    return (
        <ul className="menuList">
            {menuQuery?.data?.map((menu) => {
                return (
                    <MenuBarItem
                        label={menu.name}
                        icon={menu.icon}
                        path={menu.route}
                        deepChildren={menu.deepChildren}
                    />
                );
            })}
        </ul>
    );
}
