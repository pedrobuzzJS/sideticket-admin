import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ContentLayout } from "../components/ContentLayout/ContentLayout.tsx";
import { StarterObserver } from "../components/StarterObserver/StarterObserver.tsx";
import { SideBar } from "../components/Menu/SideBar/SideBar.tsx";

export const Route = createRootRoute({
    component: RootComponent,
});

const queryClient = new QueryClient();

function RootComponent() {
    return (
        <QueryClientProvider client={queryClient}>
            <SideBar />
            <ContentLayout>
                <HeadContent />
                <StarterObserver />
                <Outlet />
            </ContentLayout>
        </QueryClientProvider>
    );
}
