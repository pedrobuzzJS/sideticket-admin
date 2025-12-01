import { type PropsWithChildren, useCallback, useState } from "react";

import "./InputWrapper.scss";
import type { Cols } from "../../GridSystem/Grid/Grid.tsx";
import LineFluid from "../../GridSystem/LineFluid/FluidLine.tsx";

interface IInputWrapper extends PropsWithChildren {
    label: string;
    name: string;
    col?: Cols;
}

export default function InputWrapper({
    name,
    label,
    col = 3,
    children,
}: IInputWrapper) {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    return (
        <LineFluid col={col}>
            <div className="inputSpacing">
                <div
                    className={`${"inputContainer"} ${isFocused ? "inputFocus" : ""}`}
                >
                    <div className={"formLabel"}>
                        <label className="inputLabel" htmlFor={name}>
                            <span className={"leftSpan"}>{label}</span>
                        </label>
                        <div className={"rightSpan"}></div>
                    </div>
                    <div
                        className={`formField ${isFocused ? "inputFocus" : ""}`}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </LineFluid>
    );
}
