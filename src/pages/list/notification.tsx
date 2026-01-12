import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/notification")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/notification"!</div>;
}
