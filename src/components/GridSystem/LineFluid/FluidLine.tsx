import { type PropsWithChildren, useCallback } from "react";
import type { Cols } from "../Grid/Grid.tsx";
import style from "./FluidLine.module.scss";

interface SLineFluidProps extends PropsWithChildren {
    col?: Cols;
    gap?: number;
}

export default function LineFluid({
    children,
    col = 12,
    ...props
}: SLineFluidProps) {
    const getCol = useCallback(() => {
        return `col-${col}`;
    }, [col]);

    return (
        <div className={style[getCol()]} {...props}>
            {children}
        </div>
    );
}
