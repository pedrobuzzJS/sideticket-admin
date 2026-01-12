import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/banner")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/banner"!</div>;
}
