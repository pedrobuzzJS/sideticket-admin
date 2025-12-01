import { type PropsWithChildren } from "react";
import "./DataTable.scss";

type ITableRoot = PropsWithChildren;

export function TableRoot({ children }: ITableRoot) {
    return <div className="rslTableWrapper">{children}</div>;
}
