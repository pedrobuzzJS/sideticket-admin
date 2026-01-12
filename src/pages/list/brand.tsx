import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/brand")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/brand"!</div>;
}
