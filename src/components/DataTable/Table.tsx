import {
    type ColumnProps,
    type SelectedRows,
    TableRow,
} from "./TableRow/TableRow.tsx";
import React, {
    type ChangeEvent,
    type JSX,
    type PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Cols } from "../GridSystem/Grid/Grid.tsx";
import {
    ChevronFirst,
    ChevronLast,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import qs from "qs";
import { api } from "../../services/api.ts";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import { useControlledMenu } from "../../hooks/useControllerMenu.tsx";
import CircleLoader from "../CustomLoadings/CircleLoader/CircleLoader.tsx";

export interface DataTableProps<T> extends PropsWithChildren {
    columns: ColumnProps<T>[];
    data: T[];
    loading?: boolean;
    cols?: Cols;
    paginator?: boolean;
    rows?: number;
    sort?: string;
    selectedRows: SelectedRows<T>[];
    setSelectedRows: React.Dispatch<React.SetStateAction<SelectedRows<T>[]>>;
    renderTableHead?: () => JSX.Element;
    renderTableFooter?: () => JSX.Element;
    onChange?: () => void;
    currentPage?: number;
    firstPage?: number;
    lastPage?: number;
    perPage?: string;
    totalItemsFromDb?: number;
    onRowDoubleClick: (item: SelectedRows<T>) => void;
    firstPageUrl?: string;
    lastPageUrl?: string;
    nextPageUrl?: string;
    previousPageUrl?: string;
    queryKey: string[];
}

export function Table<T>({
    columns,
    data,
    loading = true,
    selectedRows,
    setSelectedRows,
    onRowDoubleClick,
    currentPage,
    lastPage,
    totalItemsFromDb,
    firstPageUrl,
    lastPageUrl,
    nextPageUrl,
    previousPageUrl,
    queryKey,
    perPage,
}: DataTableProps<T>) {
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(loading);
    const [itensPerPage, setItemsPerPage] = useState<string>(String(perPage));
    useEffect(() => {
        if (perPage) setItemsPerPage(perPage);
        if (data) setIsLoading(false);
    }, [data]);
    useEffect(() => {
        fetchPage();
    }, []);
    const headerCheckboxRef = useRef<HTMLInputElement>(null);
    const { contextProps, menuProps } = useControlledMenu({
        transition: true,
    });

    const toggleRow = useCallback(
        ({ rowIndex, rowValue }: SelectedRows<T>) => {
            setSelectedRows((prev: SelectedRows<T>[]) => {
                const alreadySelected = prev.some(
                    (r) => r.rowIndex === rowIndex,
                );
                return alreadySelected
                    ? prev.filter((r) => r.rowIndex !== rowIndex)
                    : [...prev, { rowIndex, rowValue }];
            });
        },
        [setSelectedRows],
    );

    const fetchPage = async (url?: string, item?: string) => {
        if (!url) return;
        const queryParamsObject = qs.parse(
            url?.split("v1")[1].substring(1).split("?")[1],
        );
        queryParamsObject.perPage = item ?? "50";
        const urlSearch =
            url.split("v1")[1].split("?")[0] +
            "?" +
            qs.stringify(queryParamsObject);
        await queryClient.fetchQuery({
            queryKey: [...queryKey],
            queryFn: async () => {
                const { data } = await api.get(urlSearch);
                return data;
            },
        });
    };

    const handlePerPage = async (event: ChangeEvent<HTMLSelectElement>) => {
        const value = String(event.target.value);
        setItemsPerPage(value);
        await fetchPage(firstPageUrl, value);
    };

    const isAllSelected = useMemo(
        () => data?.length > 0 && selectedRows.length === data?.length,
        [data?.length, selectedRows.length],
    );

    const isNoneSelected = selectedRows.length === 0;
    const isPartialSelected = !isNoneSelected && !isAllSelected;

    useEffect(() => {
        if (headerCheckboxRef.current) {
            headerCheckboxRef.current.indeterminate = isPartialSelected;
        }
    }, [isPartialSelected]);

    const toggleAll = useCallback(() => {
        if (isAllSelected) {
            setSelectedRows([]);
        } else {
            setSelectedRows(
                data.map((row, index) => ({
                    rowIndex: index,
                    rowValue: row,
                })),
            );
        }
    }, [isAllSelected, setSelectedRows, data]);
    return (
        <>
            <div className="rslTableBody">
                <table className="rslTable" {...contextProps}>
                    <thead>
                        <tr>
                            <th
                                onClick={toggleAll}
                                style={{ maxWidth: "2%", width: "100%" }}
                            >
                                <input
                                    ref={headerCheckboxRef}
                                    type="checkbox"
                                    checked={isAllSelected}
                                    onChange={toggleAll}
                                />
                            </th>
                            {columns?.map((column, index) =>
                                column.hidden ? null : (
                                    <th key={index}>{column.title}</th>
                                ),
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan={
                                        columns.filter((c) => !c.hidden)
                                            .length + 1
                                    }
                                >
                                    <div
                                        style={{
                                            textAlign: "center",
                                            padding: "20px",
                                        }}
                                    >
                                        <CircleLoader />
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            data?.map((item, rowIndex) => (
                                <TableRow
                                    key={rowIndex}
                                    columns={columns}
                                    rowIndex={rowIndex}
                                    item={item}
                                    isSelected={selectedRows.some(
                                        (r) => r.rowIndex === rowIndex,
                                    )}
                                    onToggle={() =>
                                        toggleRow({
                                            rowIndex: rowIndex,
                                            rowValue: item,
                                        })
                                    }
                                    onDoubleClick={onRowDoubleClick}
                                />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="rslTableFooter">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <span>{`${selectedRows.length} de ${data?.length} linha(s) selecionadas`}</span>
                    <div
                        className="rslTableFooterPagination"
                        style={{
                            display: "flex",
                            justifyContent: "end",
                            flexWrap: "nowrap",
                            gap: "5px",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <label htmlFor="rows">Registros</label>
                            <select
                                name="rows"
                                id="rows"
                                value={itensPerPage}
                                onChange={handlePerPage}
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <div>
                            <span>{`Page ${currentPage} of ${lastPage}`}</span>
                        </div>
                        <div>
                            <button
                                className={"navigationButtons"}
                                onClick={() =>
                                    fetchPage(firstPageUrl, itensPerPage)
                                }
                                disabled={currentPage == 1}
                            >
                                <ChevronFirst />
                            </button>
                            <button
                                className={"navigationButtons"}
                                onClick={() =>
                                    fetchPage(previousPageUrl, itensPerPage)
                                }
                                disabled={!previousPageUrl}
                            >
                                <ChevronLeft />
                            </button>
                            <button
                                className={"navigationButtons"}
                                onClick={() =>
                                    fetchPage(nextPageUrl, itensPerPage)
                                }
                                disabled={!nextPageUrl}
                            >
                                <ChevronRight />
                            </button>
                            <button
                                className={"navigationButtons"}
                                onClick={() =>
                                    fetchPage(lastPageUrl, itensPerPage)
                                }
                                disabled={currentPage == lastPage}
                            >
                                <ChevronLast />
                            </button>
                        </div>
                        <div>
                            <span>{`Total de registros ${totalItemsFromDb}`}</span>
                        </div>
                    </div>
                </div>
            </div>
            <ControlledMenu {...menuProps} menuClassName="ralDropdown">
                <MenuItem className="ralDropdownItem">Cut</MenuItem>
                <MenuItem className="ralDropdownItem">Copy</MenuItem>
                <MenuItem className="ralDropdownItem">Paste</MenuItem>
            </ControlledMenu>
        </>
    );
}
