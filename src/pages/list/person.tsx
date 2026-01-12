import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/person")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/person"!</div>;
}
