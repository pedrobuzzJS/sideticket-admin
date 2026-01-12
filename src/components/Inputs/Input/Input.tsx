import React, { type HTMLInputTypeAttribute } from "react";
import InputWrapper from "../InputWrapper/InputWrapper.tsx";
import type { Cols } from "../../GridSystem/Grid/Grid.tsx";
import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    placeholder?: string;
    col?: Cols;
    type?: HTMLInputTypeAttribute;
}

export function InputD({
    label,
    col,
    name,
    type = "text",
    ...props
}: InputProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const error = errors[name]?.message as string | undefined;

    return (
        <>
            <InputWrapper label={label} name={name} col={col} error={error}>
                <input
                    type={type}
                    id={name}
                    style={{ width: "100%" }}
                    {...register(name)}
                    {...props}
                />
            </InputWrapper>
        </>
    );
}
