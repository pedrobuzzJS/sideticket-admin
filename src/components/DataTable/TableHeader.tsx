import type { PropsWithChildren } from "react";
import { TableFilter } from "./TableFilter.tsx";

type ITableHeader = PropsWithChildren;

export const TableHeader = ({ children }: ITableHeader) => {
    return (
        <div className="rslTableHeader">
            <TableFilter>{children}</TableFilter>
        </div>
    );
};
