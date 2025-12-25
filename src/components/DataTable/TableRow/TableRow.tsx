import { memo, type JSX, useCallback } from "react";
import { DateTime } from "luxon";
import "./TableRow.scss";
import _ from "lodash";
import { Tag } from "../../Tag/Tag";

export interface SelectedRows<T = undefined> {
    rowIndex: number;
    rowValue: T;
}

export interface ColumnProps<T> {
    field?: keyof T;
    title: string;
    hidden?: boolean;
    isKey?: boolean;
    type?: "dateTime" | "checkbox" | "tag";
    render?: (item: T, key: string) => JSX.Element;
}

interface DataRowProps<T> {
    item: T;
    columns: ColumnProps<T>[];
    rowIndex: number;
    isSelected?: boolean;
    onToggle: (data: SelectedRows<T>) => void;
    onDoubleClick: (data: SelectedRows<T>) => void;
}

function TableRowComponent<T>({
    item,
    columns,
    rowIndex,
    onToggle,
    isSelected = false,
    onDoubleClick,
}: DataRowProps<T>) {
    const displayValue = useCallback((value: unknown) => {
        return value === null || value === undefined ? "-" : String(value);
    }, []);

    return (
        <tr
            className={`tableRow ${isSelected ? "rowSelected" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => onToggle({ rowIndex, rowValue: item })}
            onDoubleClick={() => onDoubleClick({ rowIndex, rowValue: item })}
        >
            <td>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggle({ rowIndex, rowValue: item })}
                    style={{ cursor: "pointer" }}
                />
            </td>

            {columns.map((column, index) => {
                if (column.hidden) return null;

                const key = `${String(column.field)}_${rowIndex}_${index}`;

                if (column.render) {
                    return <td key={key}>{column.render(item, key)}</td>;
                }

                if (!column.field) {
                    return <td key={key}>-</td>;
                }

                const value = item[column.field];

                if (column.type === "dateTime" && typeof value === "string") {
                    return (
                        <td key={key}>
                            {DateTime.fromISO(value)
                                .setZone("America/Sao_Paulo")
                                .toFormat("dd/MM/yyyy HH:mm")}
                        </td>
                    );
                }

                if (column.type === "tag") {
                    return (
                        <td key={key}>
                            <Tag>{String(value ?? "-")}</Tag>
                        </td>
                    );
                }

                if (column.type === "checkbox") {
                    return (
                        <td key={key}>
                            <input
                                type="checkbox"
                                defaultChecked={Boolean(value)}
                                disabled
                            />
                        </td>
                    );
                }

                return <td key={key}>{displayValue(value)}</td>;
            })}
        </tr>
    );
}

export const TableRow = memo(
    TableRowComponent,
    (prev, next) =>
        prev.isSelected === next.isSelected && _.isEqual(prev.item, next.item),
) as typeof TableRowComponent;
