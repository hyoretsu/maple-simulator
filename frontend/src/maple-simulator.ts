import bosses from "@data/bosses.json";

export interface Account {
	id: string;
	characters: Character[];
}
export type BossDifficulties = "Easy" | "Normal" | "Hard" | "Chaos" | "Extreme";
export type BossFrequency = "daily" | "weekly" | "monthly";
export type Bosses = keyof typeof bosses;
export interface BossingRoutine {
	[boss: string]:
		| {
				partySize: number;
				/** In seconds. */
				timeTaken: number;
		  }
		| undefined;
}
export interface Character {
	id: string;
	nickname: string;
	world: World;
	bossingRoutine: BossingRoutine;
}
export type World = "Aurora" | "Bera" | "Elysium" | "Hyperion" | "Kronos" | "Luna" | "Scania" | "Solis";
