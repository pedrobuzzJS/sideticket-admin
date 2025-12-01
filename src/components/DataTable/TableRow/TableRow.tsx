import { type JSX, memo } from "react";
import { DateTime } from "luxon";
import "./TableRow.scss";
import _ from "lodash";
import { Tag } from "../../Tag/Tag.tsx";

interface DataRowProps<T = unknown> {
    item: T;
    columns: ColumnProps[];
    rowIndex: number;
    isSelected?: boolean;
    onToggle: ({ rowIndex, rowValue }: SelectedRows) => void;
    onDoubleClick: (item: SelectedRows) => void;
}

export interface SelectedRows<T = unknown> {
    rowIndex: number;
    rowValue: T;
}

export interface ColumnProps<T = undefined> {
    field?: string;
    title: string;
    hidden?: boolean;
    isKey?: boolean;
    type?: "dateTime" | "checkbox" | "tag";
    render?: (item: T, index: string) => JSX.Element;
}

function TableRowCompnent<T>({
    item,
    columns,
    rowIndex,
    onToggle,
    isSelected = false,
    onDoubleClick,
}: DataRowProps<T>) {
    return (
        <tr
            key={rowIndex}
            className={`tableRow ${isSelected ? "rowSelected" : ""}`}
            onClick={() => onToggle({ rowIndex: rowIndex, rowValue: item })}
            style={{ cursor: "pointer" }}
            onDoubleClick={() => onDoubleClick(item as SelectedRows)}
        >
            <td>
                <input
                    type="checkbox"
                    onChange={() => onToggle({ rowIndex, rowValue: item })}
                    checked={isSelected}
                    style={{ cursor: "pointer" }}
                />
            </td>
            {columns?.map((column, index) => {
                if (column.hidden) return null;
                if (column.render) {
                    return (
                        <td key={index}>
                            {column.render(item, `${column.field}_${rowIndex}`)}
                        </td>
                    );
                }
                if (column.type === "dateTime") {
                    return (
                        <td key={`${column.field}_${rowIndex}`}>
                            {DateTime.fromISO(
                                (item as Record<string, string>)[
                                    column.field as string
                                ],
                            )
                                .setZone("America/Sao_Paulo")
                                .toFormat("dd/MM/yyyy HH:mm")}
                        </td>
                    );
                }
                if (column.type === "tag") {
                    return (
                        <td key={`${column.field}_${rowIndex}`}>
                            <Tag>
                                {(item as Record<string, undefined>)[
                                    column.field as string
                                ] ?? "-"}
                            </Tag>
                        </td>
                    );
                }
                if (column.type === "checkbox") {
                    return (
                        <td key={`${column.field}_${rowIndex}`}>
                            <input
                                type="checkbox"
                                defaultChecked={
                                    (item as Record<string, undefined>)[
                                        column.field as string
                                    ]
                                }
                                disabled
                            />
                        </td>
                    );
                }
                return (
                    <td key={`${column.field}_${rowIndex}`}>
                        {(item as Record<string, undefined>)[
                            column.field as string
                        ] ?? "-"}
                    </td>
                );
            })}
        </tr>
    );
}

export const TableRow = memo(TableRowCompnent, (prev, next) => {
    return (
        prev.isSelected === next.isSelected && _.isEqual(prev.item, next.item)
    );
});
