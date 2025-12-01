import { Menu } from "@szhsin/react-menu";
import { type PropsWithChildren } from "react";
import Btn from "../Button/Btn.tsx";

export function DropDownRoot({ children }: PropsWithChildren) {
    return (
        <Menu menuButton={<Btn>Botao</Btn>} menuClassName="ralDropdown">
            {children}
        </Menu>
    );
}
