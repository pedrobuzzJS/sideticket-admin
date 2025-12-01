import type { PropsWithChildren } from "react";
import "./Tag.scss";

type TagProps = PropsWithChildren;
export function Tag({ children }: TagProps) {
    return <span className={"tag warning"}>{children}</span>;
}
