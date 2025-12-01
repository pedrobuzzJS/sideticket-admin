import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./route-tree.gen.ts";
import type { Router } from "lucide-react";
import "./total_reset.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
});
export type AppRouter = typeof Router;
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
