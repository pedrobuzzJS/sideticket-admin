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
    id?: string;
}

const schema = z.object({
    id: z.string().nullable(),
    name: z.string().min(1, "O nome é obrigatório"),
    status: z.coerce.number().int(),
    approved: z.boolean(),
    createdAt: z.coerce.date().optional(),
});

type FormData = z.infer<typeof schema>;

export function CompanyForm({ id, onClose, open }: CompanyFormProps) {
    const companyForm = useForm<FormData>({
        defaultValues: {
            id: "",
            name: "",
            approved: true,
        },
        resolver: zodResolver(schema),
    });
    const { reset, handleSubmit } = companyForm;

    async function loadData() {
        if (!id) return null;
        const { data } = await api.get(`company/${id}`);
        console.log(data);
        return data;
    }

    const companyQuery = useQuery({
        queryKey: ["company", id],
        queryFn: loadData,
        enabled: !!id,
    });

    useEffect(() => {
        if (companyQuery.data) reset(companyQuery.data);
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

    const footer = () => {
        return (
            <>
                <Btn
                    style={{ cursor: "pointer", backgroundColor: "#329000" }}
                    onClick={() => save()}
                >
                    Gravar
                </Btn>
                <Btn
                    style={{ cursor: "pointer", backgroundColor: "#329000" }}
                    onClick={() => save(true)}
                >
                    Gravar e Continuar
                </Btn>
            </>
        );
    };

    const save = handleSubmit(async (data) => {
        await saveData("company", id, data);
        closeAndClean();
    });

    return (
        <Modal
            id="company"
            isOpen={open}
            onClose={() => closeAndClean()}
            footer={footer()}
            draggable
        >
            <FormProvider {...companyForm}>
                <Grid>
                    <RslForm id={"company"}>
                        <InputD name="id" label={"Código"} col={12} disabled />
                        <InputD name={"name"} label={"Nome"} col={12} />
                        <InputD
                            name={"status"}
                            label={"Status"}
                            col={11}
                            type={"number"}
                        />
                        <Checkbox name="approved" label={"Aprovado"} col={1} />
                        <RslDatePicker
                            name={"createdAt"}
                            label={"Data de Criação"}
                            col={12}
                            // disabled
                        />
                    </RslForm>
                </Grid>
            </FormProvider>
        </Modal>
    );
}
