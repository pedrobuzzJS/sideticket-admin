import React from "react";
import type { Cols } from "../../GridSystem/Grid/Grid.tsx";
import { useFormContext } from "react-hook-form";
import InputWrapper from "../InputWrapper/InputWrapper.tsx";

interface ICheckbox extends React.HTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    col?: Cols;
}

export function Checkbox({ name, label, col = 12, ...props }: ICheckbox) {
    const { register } = useFormContext();
    return (
        <InputWrapper label={label} name={name} col={col}>
            <input id={name} type={"checkbox"} {...register(name)} {...props} />
        </InputWrapper>
    );
}
