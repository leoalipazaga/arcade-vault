import { GAMES } from "@/lib/data";
import { HomeClient } from "./home-client";

export default function Home() {
  return <HomeClient games={GAMES} />;
}
