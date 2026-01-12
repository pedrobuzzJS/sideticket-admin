import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/documentsignature")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/documentsignature"!</div>;
}
