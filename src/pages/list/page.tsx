import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/page")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/page"!</div>;
}
