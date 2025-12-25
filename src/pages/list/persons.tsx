import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/persons")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/persons"!</div>;
}
