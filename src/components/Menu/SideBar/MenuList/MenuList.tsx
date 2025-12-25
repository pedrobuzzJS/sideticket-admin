import "./MenuList.scss";
import { MenuBarItem } from "./MenuBarItem/MenuBarItem.tsx";

export function MenuList() {
    return (
        <ul className="menuList">
            <MenuBarItem
                label={"PrincipalPrincipalPrincipalPrincipalPrincipal"}
                icon={"fa-solid fa-table-columns"}
                path={"/"}
            />
            <MenuBarItem
                label={"Gestão de Ingresso"}
                icon={"fa-solid fa-ticket"}
            />
            <MenuBarItem
                label={"Financeiro"}
                icon={"fa-solid fa-calculator"}
            />
            <MenuBarItem
                label={"Faturamento"}
                icon={"fa-solid fa-hand-holding-dollar"}
            />
            <MenuBarItem
                label={"Gestão de Eventos"}
                icon={"fa-regular fa-calendar"}
            />
            <MenuBarItem 
                label={"Eventos"}
                icon={"fa-solid fa-calendar"}
            />
            <MenuBarItem
                label={"Gestão de Usuários"}
                icon={"fa-solid fa-users"}
            />
            <MenuBarItem
                label={"Gestão de Pessoas"}
                icon={"fa-solid fa-people-group"}
            />
            <MenuBarItem
                label={"Gerenciador de SistemaSistemaSistemaSistemaSistema"}
                icon={"fa-solid fa-gears"}
            />
        </ul>
    );
}
