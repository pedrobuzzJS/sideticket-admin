import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/derivationitem")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/derivationitem"!</div>;
}
