import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./route-tree.gen.ts";
import "./total_reset.scss"

export const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
});
export type AppRouter = typeof router;

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
