import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api.ts";
import { useState } from "react";
import type {
    ColumnProps,
    SelectedRows,
} from "../../components/DataTable/TableRow/TableRow.tsx";
import { collect } from "collect.js";
import { DataTable } from "../../components/DataTable/index.tsx";
import Btn from "../../components/Button/Btn.tsx";
import { CompanyForm } from "../../forms/CompanyForm.tsx";

export const Route = createFileRoute("/list/company")({
    component: RouteComponent,
});

interface CompanyProps {
    id: string;
    name: string;
    domain?: string;
    subDomain?: string;
    status?: number | string;
    plan: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
    metadata?: string;
}

function RouteComponent() {
    const companyQuery = useQuery({
        queryKey: ["company"],
        queryFn: async () => {
            const { data } = await api.get("company");
            return data;
        },
    });

    const [selectedRows, setSelectedRows] = useState<SelectedRows[]>([]);
    const [columns] = useState<ColumnProps<CompanyProps>[]>([
        { title: "ID", field: "id", hidden: false, isKey: true },
        { title: "Nome", field: "name", hidden: false },
        { title: "Status", field: "status", hidden: false },
        { title: "Metadata", field: "metadata", hidden: true },
        {
            title: "createdAt",
            field: "createdAt",
            hidden: false,
            type: "dateTime",
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
        await companyQuery.refetch();
        setSelectedRows([]);
    }

    function editRegister(item: SelectedRows) {
        setId(item?.id);
        openModal();
    }

    async function deleteRegister() {
        console.log(
            collect(selectedRows).pluck("rowValue").pluck("id").toArray()[0],
        );
        await api.delete(
            `/company/${collect(selectedRows).pluck("rowValue").pluck("id").toArray()}`,
        );
        await companyQuery.refetch();
    }

    return (
        <>
            <CompanyForm id={id} open={isModalOpen} onClose={closeModal} />
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
                <DataTable.Table
                    data={companyQuery.data?.data}
                    columns={columns}
                    loading={companyQuery.isLoading}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    currentPage={companyQuery.data?.currentPage}
                    lastPage={companyQuery.data?.lastPage}
                    totalItemsFromDb={companyQuery.data?.total}
                    onRowDoubleClick={editRegister}
                    firstPageUrl={companyQuery.data?.firstPageUrl}
                    lastPageUrl={companyQuery.data?.lastPageUrl}
                    nextPageUrl={companyQuery.data?.nextPageUrl}
                    previousPageUrl={companyQuery.data?.previousPageUrl}
                    queryKey={["company"]}
                    perPage={companyQuery.data?.perPage}
                />
            </DataTable.Root>
        </>
    );
}
