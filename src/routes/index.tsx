import { createFileRoute } from "@tanstack/react-router";

import Mail from "@/pages/Mail";

export const Route = createFileRoute("/")({
  component: Mail,
});
