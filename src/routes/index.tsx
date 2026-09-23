import { createFileRoute } from "@tanstack/react-router";

import Materials from "@/pages/Materials";

export const Route = createFileRoute("/")({
  component: MaterialsComponent,
});

function MaterialsComponent() {
  return <Materials />;
}
