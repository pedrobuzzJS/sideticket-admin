import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/inventory")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/inventory"!</div>;
}
