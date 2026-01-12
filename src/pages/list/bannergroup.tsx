import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/list/bannergroup")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/list/bannergroup"!</div>;
}
