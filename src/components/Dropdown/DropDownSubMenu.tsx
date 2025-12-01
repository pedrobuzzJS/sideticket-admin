import { SubMenu } from "@szhsin/react-menu";
import type { PropsWithChildren } from "react";

interface ISubMenu extends PropsWithChildren {
    label: string;
}
export function DropDownSubMenu({ label, children }: ISubMenu) {
    return <SubMenu label={label}>{children}</SubMenu>;
}
