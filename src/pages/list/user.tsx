import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/user")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/user"!</div>;
}
