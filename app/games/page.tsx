import { GAMES, CATS } from "@/lib/data";
import { LibraryClient } from "../components/library-client";

export default function GamesPage() {
  return <LibraryClient games={GAMES} cats={CATS} />;
}
