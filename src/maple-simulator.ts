import bosses from "@data/bosses.json";

export interface Account {
	id: string;
	characters: Character[];
}
export type BossDifficulties = "Easy" | "Normal" | "Hard" | "Chaos" | "Extreme";
export type BossFrequency = "daily" | "weekly" | "monthly";
export type Bosses = keyof typeof bosses;
export type SymbolType = "Arcane" | "Sacred";
export type World = "Aurora" | "Bera" | "Elysium" | "Hyperion" | "Kronos" | "Luna" | "Scania" | "Solis";

export interface BossRunInfo {
	partySize: number;
	/** In seconds. */
	timeTaken: number;
}
export interface BossingRoutine {
	[boss: string]: BossRunInfo | undefined;
}
export interface Equipment {
	id: number;
	name: string;
	description: string;
	requirements: {
		dex: number;
		int: number;
		job: null;
		level: number;
		luk: number;
		str: number;
	};
}
export interface SymbolData {
	level: number;
	exp: number;
}
export interface SymbolInfo {
	Arcane: SymbolData[];
	Sacred: SymbolData[];
}
export interface Character {
	id: string;
	bossingRoutine: BossingRoutine;
	level: number;
	nickname: string;
	symbols: SymbolInfo;
	world: World;
}
