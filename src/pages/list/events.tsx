import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/events")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/events"!</div>;
}
