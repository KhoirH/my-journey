import type { Route } from "./+types/home";
import Portofolio from "../welcome/portofolio";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hilmi Khoirulloh Journey" },
    { name: "description", content: "My journey from zero to be a fullstack developer" },
  ];
}

export default function Home() {
  return <Portofolio />;
}
