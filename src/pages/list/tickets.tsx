import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/tickets")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/tickets"!</div>;
}
