import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/product")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/product"!</div>;
}
