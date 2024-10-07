import Link from "next/link";
import { Calendar, Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export default function Navigation() {
  return (
    <>
      {/* <Link
        href="/dashboard"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary bg-muted"
      >
        <Home className="h-4 w-4" />
        Dashboard{" "}
      </Link> */}
      <Link
        href="/dashboard/appointment"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary bg-muted"
      >
        <Calendar className="h-4 w-4" />
        Appointments
      </Link>
    </>
  );
}
