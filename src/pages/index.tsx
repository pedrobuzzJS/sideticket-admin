import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: RouteComponent,
    head: () => ({
        meta: [
            {
                title: "Sideticket",
            },
        ],
    }),
});

function RouteComponent() {
    return <span>Home</span>;
}
