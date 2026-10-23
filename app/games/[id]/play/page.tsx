import { notFound } from "next/navigation";
import { GAMES } from "@/lib/data";
import { PlayerClient } from "./player-client";

export default async function PlayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = GAMES.find((g) => g.id === id);
  if (!game) notFound();

  return <PlayerClient game={game} />;
}
