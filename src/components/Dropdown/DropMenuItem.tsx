import { MenuItem } from "@szhsin/react-menu";
import type { PropsWithChildren } from "react";

export function DropMenuItem({ children }: PropsWithChildren) {
    return <MenuItem className="ralDropdownItem">{children}</MenuItem>;
}
