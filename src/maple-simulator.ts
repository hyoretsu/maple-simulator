import bosses from "@data/bosses.json";

export interface Account {
	id: string;
	characters: Character[];
}
export type BossDifficulties = "Easy" | "Normal" | "Hard" | "Chaos" | "Extreme";
export type BossFrequency = "daily" | "weekly" | "monthly";
export type Bosses = keyof typeof bosses;
export type EquipmentType =
	| "Android"
	| "Badge"
	| "Belt"
	| "Bottom"
	| "Cape"
	| "Earrings"
	| "Emblem"
	| "Eye Accessory"
	| "Face Accessory"
	| "Gloves"
	| "Hat"
	| "Heart"
	| "Medal"
	| "Pendant"
	| "Ring"
	| "Secondary Weapon"
	| "Shoes"
	| "Shoulder"
	| "Top"
	| "Weapon";
export interface Job {
	id: number;
	name: string;
}
export interface PlayableClass {
	name: string;
	branch: "Bowman" | "Magician" | "Pirate" | "Thief" | "Warrior" | "Xenon";
	mainStat: [Stat | "HP"] | [Stat, Stat, Stat];
	secondaryStat: [Stat] | [Stat, Stat] | null;
	jobs: [number, number, number, number, number, number, number];
}
export type Stat = "STR" | "DEX" | "INT" | "LUK";
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
	icon?: number;
	description?: string;
	type?: EquipmentType;
	requirements: {
		dex?: number;
		int?: number;
		job?: string;
		level?: number;
		luk?: number;
		str?: number;
	};
	flameAdvantage?: boolean;
}
export interface SymbolData {
	level: number;
	exp: number;
}
export interface SymbolInfo {
	Arcane: SymbolData[];
	Sacred: SymbolData[];
}
export interface Flames {
	allStats?: number;
	att?: number;
	dex?: number;
	int?: number;
	hp?: number;
	mAtt?: number;
	mp?: number;
	luk?: number;
	str?: number;
}
export interface CharacterEquipment {
	id: number;
	flames?: Flames;
}
export type CharacterEquip = CharacterEquipment | null;
export interface CharacterEquips {
	Android: CharacterEquip;
	Badge: CharacterEquip;
	Belt: CharacterEquip;
	Bottom: CharacterEquip;
	Cape: CharacterEquip;
	Earrings: CharacterEquip;
	Emblem: CharacterEquip;
	"Eye Accessory": CharacterEquip;
	"Face Accessory": CharacterEquip;
	Gloves: CharacterEquip;
	Hat: CharacterEquip;
	Heart: CharacterEquip;
	Medal: CharacterEquip;
	Pendant: CharacterEquip[];
	Ring: CharacterEquip[];
	"Secondary Weapon": CharacterEquip;
	Shoes: CharacterEquip;
	Shoulder: CharacterEquip;
	Top: CharacterEquip;
	Weapon: CharacterEquip;
}
export interface Character {
	id: string;
	bossingRoutine: BossingRoutine;
	class: string;
	equips: CharacterEquips;
	level: number;
	nickname: string;
	symbols: SymbolInfo;
	world: World;
}
