import { GAMES } from "@/lib/data";
import { HallClient } from "./hall-client";

export default function HallOfFamePage() {
  return <HallClient games={GAMES} />;
}
