import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/users")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/users"!</div>;
}
