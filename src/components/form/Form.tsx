import { type FormHTMLAttributes } from "react";
import "./Form.scss";

type IForm = FormHTMLAttributes<HTMLFormElement>;
export default function RslForm({ id, children, ...props }: IForm) {
    return (
        <form
            {...props}
            className="form"
            id={id}
            onSubmit={(e) => e.preventDefault()}
        >
            {children}
        </form>
    );
}
