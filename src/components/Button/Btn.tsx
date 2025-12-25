import "./Btn.scss";
import React from "react";
import Ripples from "react-ripples";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}
export default function Btn({ children, ...props }: ButtonProps) {
    return (
        <Ripples
            placeholder={""}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
        >
            <button className={"btn"} {...props}>
                {children}
            </button>
        </Ripples>
    );
}
