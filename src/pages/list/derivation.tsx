import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/derivation")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/derivation"!</div>;
}
