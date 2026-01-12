import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/file")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/file"!</div>;
}
