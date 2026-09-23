import { createRootRoute, Outlet } from "@tanstack/react-router";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Container from "@/components/ui/container";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />

      <main className="flex w-full flex-1">
        <Container>
          <Outlet />
        </Container>
      </main>

      <Footer />
    </div>
  );
}
