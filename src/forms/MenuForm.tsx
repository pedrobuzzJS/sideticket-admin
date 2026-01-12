import { FormProvider, useForm } from "react-hook-form";
import { api, saveData } from "../services/api.ts";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Btn from "../components/Button/Btn.tsx";
import Modal from "../components/Modal/Modal.tsx";
import Grid from "../components/GridSystem/Grid/Grid.tsx";
import { RslDatePicker } from "../components/Inputs/Date/DatePicker/DatePicker.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputD } from "../components/Inputs/Input/Input.tsx";
import { Checkbox } from "../components/Inputs/Checkbox/Checkbox.tsx";
import RslForm from "../components/form/Form.tsx";

interface CompanyFormProps {
    open: boolean;
    onClose: () => void;
    id?: number | number | undefined;
}

const schema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "O nome é obrigatório"),
    status: z.coerce.number().int(),
    approved: z.boolean(),
    createdAt: z.coerce.date(),
});

type FormData = z.infer<typeof schema>;

export function MenuForm({ id, onClose, open }: CompanyFormProps) {
    const companyForm = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            id: "",
            name: "",
            approved: true,
            status: 0,
            createdAt: undefined,
        },
    });

    const { reset, handleSubmit } = companyForm;

    async function loadData() {
        const { data } = await api.get(`company/${id}`);
        return data;
    }

    const companyQuery = useQuery({
        queryKey: ["company", id],
        queryFn: loadData,
        enabled: !!id,
    });

    useEffect(() => {
        if (companyQuery.data) {
            reset({
                ...companyQuery.data,
                createdAt: companyQuery.data.createdAt
                    ? new Date(companyQuery.data.createdAt)
                    : undefined,
            });
        }
    }, [companyQuery.data, reset]);

    const closeAndClean = (stayInForm = false) => {
        if (stayInForm) return;

        reset({
            id: "",
            name: "",
            approved: true,
            status: 0,
            createdAt: undefined,
        });

        onClose();
    };

    const save = (stayInForm = false) =>
        handleSubmit(async (data) => {
            await saveData("company", id, data);
            closeAndClean(stayInForm);
        });

    const footer = (
        <div className="modalFooter">
            <Btn
                style={{ cursor: "pointer", backgroundColor: "#329000" }}
                onClick={save(false)}
            >
                Gravar
            </Btn>

            <Btn
                style={{ cursor: "pointer", backgroundColor: "#329000" }}
                onClick={save(true)}
            >
                Gravar e Continuar
            </Btn>
        </div>
    );

    return (
        <Modal
            id="company"
            isOpen={open}
            onClose={() => closeAndClean()}
            footer={footer}
            draggable
        >
            <FormProvider {...companyForm}>
                <Grid>
                    <RslForm id="company">
                        <InputD name="id" label="Código" col={12} disabled />
                        <InputD name="name" label="Nome" col={2} />
                        <InputD
                            name="status"
                            label="Status"
                            col={11}
                            type="number"
                        />
                        <Checkbox name="approved" label="Aprovado" col={1} />
                        <RslDatePicker
                            name="createdAt"
                            label="Data de Criação"
                            col={12}
                        />
                    </RslForm>
                </Grid>
            </FormProvider>
        </Modal>
    );
}
