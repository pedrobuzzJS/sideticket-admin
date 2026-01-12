import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api.ts";
import { useState } from "react";
import type {
    ColumnProps,
    SelectedRows,
} from "../../components/DataTable/TableRow/TableRow.tsx";
import { collect } from "collect.js";
import { DataTable } from "../../components/DataTable";
import Btn from "../../components/Button/Btn.tsx";
import { MenuForm } from "../../forms/MenuForm.tsx";

export const Route = createFileRoute("/list/menu")({
    component: RouteComponent,
});

interface Menu {
    id: number | string;
    name: string;
    route: string;
    parentId: string;
    order: string;
    icon: string;
    disabled: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    metadata: string;
}

function RouteComponent() {
    const menuQuery = useQuery({
        queryKey: ["menu"],
        queryFn: async () => {
            const { data } = await api.get("menu");
            return data;
        },
    });

    const [selectedRows, setSelectedRows] = useState<SelectedRows<Menu>[]>([]);
    const [columns] = useState<ColumnProps<Menu>[]>([
        {
            title: "ID",
            field: "id",
            hidden: false,
            isKey: true,
            float: "center",
            width: 30,
        },
        { title: "Nome", field: "name", hidden: false, width: 200 },
        { title: "Rota", field: "route", float: "center", width: 200 },
        { title: "Pai", field: "parentId", width: 30, float: "center" },
        { title: "Ordem", field: "order", float: "center", width: 100 },
        { title: "Ícone", field: "icon", width: 400 },
        {
            title: "Desabilitado",
            field: "disabled",
            type: "checkbox",
            width: 50,
        },
        {
            title: "createdAt",
            field: "createdAt",
            hidden: false,
            type: "dateTime",
            width: 400,
            float: "center",
        },
        { title: "updatedAt", field: "updatedAt", hidden: true },
        { title: "deletedAt", field: "deletedAt", hidden: true },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState<number | number | undefined>();
    function openModal() {
        setIsModalOpen(true);
    }

    async function closeModal() {
        setId("");
        setIsModalOpen(false);
        await menuQuery.refetch();
        setSelectedRows([]);
    }

    async function deleteRegister() {
        await api.delete(
            `/menu/${collect(selectedRows).pluck("rowValue").pluck("id").toArray()}`,
        );
        await menuQuery.refetch();
    }

    return (
        <>
            <MenuForm id={id} open={isModalOpen} onClose={closeModal} />
            <DataTable.Root>
                <DataTable.Header>
                    <Btn
                        onClick={openModal}
                        style={{
                            backgroundColor: "#329000",
                            cursor: "pointer",
                        }}
                    >
                        Adicionar
                    </Btn>
                    <Btn
                        onClick={openModal}
                        style={{
                            backgroundColor: "#329000",
                            cursor: "pointer",
                        }}
                        disabled={selectedRows.length !== 1}
                    >
                        Editar
                    </Btn>
                    <Btn
                        onClick={deleteRegister}
                        style={{
                            backgroundColor: "#329000",
                            cursor: "pointer",
                        }}
                        disabled={selectedRows.length < 1}
                    >
                        Deletar
                    </Btn>
                </DataTable.Header>
                <DataTable.Table<Menu>
                    data={menuQuery.data?.data}
                    columns={columns}
                    loading={menuQuery.isLoading}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    currentPage={menuQuery.data?.currentPage}
                    lastPage={menuQuery.data?.lastPage}
                    totalItemsFromDb={menuQuery.data?.total}
                    firstPageUrl={menuQuery.data?.firstPageUrl}
                    lastPageUrl={menuQuery.data?.lastPageUrl}
                    nextPageUrl={menuQuery.data?.nextPageUrl}
                    previousPageUrl={menuQuery.data?.previousPageUrl}
                    queryKey={["menu"]}
                    perPage={menuQuery.data?.perPage}
                />
            </DataTable.Root>
        </>
    );
}
