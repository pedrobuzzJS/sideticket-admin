import InputWrapper from "../../InputWrapper/InputWrapper.tsx";
import { useController, useFormContext } from "react-hook-form";
import DatePicker from "react-date-picker";
import type { Value } from "react-date-picker/src/shared/types.ts";
import { useCallback } from "react";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "./DatePicker.scss";
import type { Cols } from "../../../GridSystem/Grid/Grid.tsx";

// declare global {
//     interface Window {
//         $: typeof $;
//     }
// }
//
// window.$ = $;

interface IDatePicker {
    name: string;
    label: string;
    value?: string;
    onChange?: (value: string) => void;
    col?: Cols;
    disabled?: boolean;
}

export function RslDatePicker({
    name,
    label,
    col = 4,
    disabled = false,
}: IDatePicker) {
    const { control } = useFormContext();
    const {
        field: { onChange, value },
        fieldState: { error },
    } = useController({ name, control });

    const handleChange = useCallback(
        (item: Value) => {
            return onChange(item?.toString());
        },
        [onChange],
    );

    return (
        <InputWrapper label={label} name={name} col={col} error={error}>
            <DatePicker
                onChange={(item) => handleChange(item)}
                value={value}
                format={"dd/MM/yyyy"}
                disabled={disabled}
            />
        </InputWrapper>
    );
}
