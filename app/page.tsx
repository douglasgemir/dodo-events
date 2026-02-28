import { redirect } from "next/navigation";
import { Dashboard } from "./protected/dashboard/page";

export default function Home() {
  redirect("/protected/dashboard");
}
