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

export const Route = createFileRoute("/list/module")({
    component: RouteComponent,
});

interface ModuleProps {
    id: string;
    name: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    metadata?: string;
}
function RouteComponent() {
    const moduleQuery = useQuery({
        queryKey: ["module"],
        queryFn: async () => {
            const { data } = await api.get("module");
            return data;
        },
    });

    const [selectedRows, setSelectedRows] = useState<SelectedRows[]>([]);
    const [columns] = useState<ColumnProps<ModuleProps>[]>([
        {
            title: "ID",
            field: "id",
            hidden: false,
            isKey: true,
            float: "center",
            width: 30,
        },
        { title: "Nome", field: "name", hidden: false, width: 200 },
        {
            title: "Descrição",
            field: "description",
            type: "tag",
            float: "center",
            width: 200,
            hidden: true,
        },
        {
            title: "Data de criação",
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
    const [id, setId] = useState<number>();
    function openModal() {
        setIsModalOpen(true);
    }

    async function closeModal() {
        setId(null);
        setIsModalOpen(false);
        await moduleQuery.refetch();
        setSelectedRows([]);
    }

    function editRegister(item: SelectedRows) {
        setId(item?.id);
        openModal();
    }

    async function deleteRegister() {
        await api.delete(
            `/module/${collect(selectedRows).pluck("rowValue").pluck("id").toArray()}`,
        );
        await moduleQuery.refetch();
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
                    data={moduleQuery.data?.data}
                    columns={columns}
                    loading={moduleQuery.isLoading}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    currentPage={moduleQuery.data?.currentPage}
                    lastPage={moduleQuery.data?.lastPage}
                    totalItemsFromDb={moduleQuery.data?.total}
                    onRowDoubleClick={editRegister}
                    firstPageUrl={moduleQuery.data?.firstPageUrl}
                    lastPageUrl={moduleQuery.data?.lastPageUrl}
                    nextPageUrl={moduleQuery.data?.nextPageUrl}
                    previousPageUrl={moduleQuery.data?.previousPageUrl}
                    queryKey={["module"]}
                    perPage={moduleQuery.data?.perPage}
                />
            </DataTable.Root>
        </>
    );
}
