import type { PropsWithChildren } from "react";

type ITableFilter = PropsWithChildren;

export function TableFilter({ children }: ITableFilter) {
    return (
        <div className="rslTableFilter" style={{ width: "100%" }}>
            {children}
        </div>
    );
}
