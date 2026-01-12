import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/category")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/category"!</div>;
}
