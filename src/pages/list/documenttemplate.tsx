import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/documenttemplate")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/documenttemplate"!</div>;
}
