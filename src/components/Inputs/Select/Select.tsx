import Select, { type Props } from "react-select";
import type { Cols } from "../../GridSystem/Grid/Grid.tsx";
import InputWrapper from "../InputWrapper/InputWrapper.tsx";
import { useController, useFormContext } from "react-hook-form";
import "./Select.scss";
import { useCallback } from "react";
import { collect } from "collect.js";

export type Option = {
    value: unknown;
    label: string;
    isFixed?: boolean;
    isDisabled?: boolean;
};
interface ISelectProps extends Props {
    name: string;
    label: string;
    placeholder: string;
    col: Cols;
    options: Option[];
}

export function RslSelect({
    isClearable = false,
    isDisabled = false,
    isSearchable = false,
    name,
    options,
    placeholder,
    label,
    col,
    isLoading = false,
    isRtl = false,
    isMulti = false,
    ...props
}: ISelectProps) {
    const { control } = useFormContext();

    const {
        field: { onChange, value, ref },
        fieldState: { error },
    } = useController({ name, control });

    const handleChange = useCallback(
        (item: unknown) => {
            if (Array.isArray(item)) {
                return onChange(collect(item).pluck("value").toArray());
            }
            return onChange((item as Option)?.value ?? null);
        },
        [onChange],
    );

    return (
        <InputWrapper label={label} name={name} col={col}>
            <Select
                ref={ref}
                classNamePrefix="react-select"
                className="customSelect"
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                isMulti={isMulti}
                isSearchable={isSearchable}
                name={name}
                options={options}
                placeholder={placeholder}
                value={options.find((option) => option.value === value) ?? null}
                onChange={(item: unknown) => handleChange(item)}
                {...props}
            />
            {error && <span style={{ color: "red" }}>{error.message}</span>}
        </InputWrapper>
    );
}
