import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Card className="my-auto h-screen mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Scribe App</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            finibus mi sit amet est sollicitudin, non tincidunt nibh auctor.
            Vivamus commodo eros non lobortis euismod.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Dr Neil Williams</SelectItem>
                <SelectItem value="dark">Dr. Joanne Henderson</SelectItem>
                <SelectItem value="system">Dr. Trisha Patel</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/dashboard">
              <Button className="w-full">Go to App</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
