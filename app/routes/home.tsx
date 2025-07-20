import type { Route } from "./+types/home";
import Portofolio from "../welcome/portofolio";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Portofolio />;
}
