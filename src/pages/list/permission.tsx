import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/permission")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/permission"!</div>;
}
