import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/asynctask")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/asynctask"!</div>;
}
