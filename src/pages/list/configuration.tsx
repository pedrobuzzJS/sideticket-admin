import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/configuration")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/configuration"!</div>;
}
