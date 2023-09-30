"use client";
import { useFetch } from "@hyoretsu/react-hooks";
import { Equipment } from "backend";
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";

import api from "@services/api";

type Jobs = "Beginner" | "Warrior" | "Mage";

type CoreStats = {
	hp: number;
	mp: number;
};

type NormalStats = {
	str: number;
	dex: number;
	int: number;
	luk: number;
};

type Stats = keyof (CoreStats & NormalStats);

type AbilityPoints = {
	ap: CoreStats &
		NormalStats & {
			available: number;
		};
};

type CharStats = CoreStats & NormalStats & AbilityPoints;

interface CharInfo {
	name: string;
	level: number;
	exp: number;
	job: Jobs;
	guild: string;
	fame: number;
}

interface StoredEquip {
	id: number;
}

type StoredSymbol = {
	id: number;
	level: number;
};

interface Char extends CharInfo {
	stats: CharStats;
	equips: Record<string, StoredEquip>;
	symbols: {
		[key in "arcane" | "sacred"]: Array<StoredSymbol>;
	};
}

interface Helpers {
	equips: Record<string, Equipment>;
	stats: CoreStats &
		NormalStats & {
			innerAbility: string[];
		} & Record<
			| "arcanePower"
			| "buffDuration"
			| "bossDmg"
			| "critDmg"
			| "critRate"
			| "def"
			| "dmgBonus"
			| "finalDmg"
			| "ied"
			| "itemDrop"
			| "jump"
			| "lowerRange"
			| "mesoDrop"
			| "sacredPower"
			| "speed"
			| "stance"
			| "starForce"
			| "statusResistance"
			| "upperRange",
			number
		>;
	updateEquips: (type: string, equipId: number) => void;
	updateInfo: (info: string, value: string | number) => void;
}

type ContextData = Omit<Char, "stats" | "equips"> & { ap: number } & Helpers;

export const classes: Record<string, { mainStat: Stats[]; mastery: number; secondaryStat: Stats[] }> = {
	Beginner: {
		mainStat: [""],
		mastery: 20,
		secondaryStat: [""],
	},
	Warrior: {
		mainStat: ["str"],
		mastery: 20,
		secondaryStat: ["dex"],
	},
	Mage: {
		mainStat: ["int"],
		mastery: 25,
		secondaryStat: ["dex"],
	},
};

const weaponMultipliers: Record<string, number> = {
	"Ancient Bow": 1.3,
	"Arm Cannon": 1.7,
	Bladecaster: 1.3,
	Bow: 1.3,
	Cane: 1.3,
	Cannon: 1.5,
	Claw: 1.75,
	Crossbow: 1.35,
	Dagger: 1.3,
	Desperado: 1.3,
	"Dual Bowguns": 1.3,
	"Energy Chain": 1.3,
	Fan: 1.35,
	"Great Sword": 1.49,
	Gun: 1.5,
	Katana: 1.25,
	Knuckle: 1.7,
	"Long Sword": 1.34,
	"Magic Gauntlet": 1.2,
	"One-handed Axe": 1.2,
	"One-handed Blunt Weapon": 1.2,
	"One-handed Sword": 1.24,
	Polearm: 1.49,
	"Psy Limiter": 1.2,
	"Ritual Fan": 1.3,
	Scepter: 1.34,
	"Shining Rod": 1.2,
	"Soul Shooter": 1.7,
	Spear: 1.49,
	Staff: 1.2,
	"Two-handed Axe": 1.34,
	"Two-handed Blunt Weapon": 1.34,
	"Two-handed Sword": 1.34,
	Wand: 1.2,
	"Whip Blade": 1.3125,
	Whispershot: 1.3,
};

const CharContext = createContext({} as ContextData);

export const CharProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [charInfo, setCharInfo] = useState({
		name: "Default",
		level: 1,
		exp: 0,
		job: "Beginner",
		guild: "",
		fame: 0,
		innerAbility: [],
		stats: {
			hp: 50,
			mp: 5,
			ap: {
				available: 9,
				hp: 0,
				mp: 0,
				str: 0,
				dex: 0,
				int: 0,
				luk: 0,
			},
			str: 4,
			dex: 4,
			int: 4,
			luk: 4,
		},
		equips: {
			android: { id: 0 },
			badge: { id: 0 },
			belt: { id: 0 },
			book: { id: 1172000 },
			bottom: { id: 0 },
			cape: { id: 0 },
			earrings: { id: 0 },
			emblem: { id: 0 },
			eyeAcc: { id: 0 },
			faceAcc: { id: 0 },
			gloves: { id: 0 },
			heart: { id: 0 },
			medal: { id: 0 },
			pendant1: { id: 0 },
			pendant2: { id: 0 },
			ring1: { id: 0 },
			ring2: { id: 0 },
			ring3: { id: 0 },
			ring4: { id: 0 },
			secondary: { id: 0 },
			shoes: { id: 0 },
			shoulder: { id: 0 },
			top: { id: 0 },
			weapon: { id: 0 },
		},
		symbols: {
			arcane: Array.from({ length: 6 }, () => ({ id: 0, level: 1 })),
			sacred: Array.from({ length: 3 }, () => ({ id: 0, level: 1 })),
		},
	});

	useEffect(() => {
		const storedInfo = localStorage.getItem("@MapleSimulator:char_info");
		if (storedInfo === null) {
			localStorage.setItem("@MapleSimulator:char_info", JSON.stringify(charInfo));

			return;
		}

		setCharInfo(JSON.parse(storedInfo));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Having 'equips' in the dependency array synchronizes/awaits changes
	const { data } = useFetch(["/equips/find", charInfo.equips], api, {
		id: [
			...Object.entries(charInfo.equips)
				.filter(([key]) => key !== "symbols")
				.map(([_, equip]) => (equip as Equipment).id),
		],
	});
	const equips = useMemo<Record<string, Equipment>>(() => {
		if (!data) return [];

		const equipsObject = {};

		(data as Equipment[]).forEach(equip => {
			if (equip.type === "Pendant" || equip.type === "Ring") {
				Object.entries(charInfo.equips)
					.filter(([key]) => key.match(/pendant|ring\d/))
					.forEach(([key, value]) => {
						if (value.id === equip.id) Object.assign(equipsObject, { [key]: equip });
					});
			} else if (equip.type === "Eye Accessory" || equip.type === "Face Accessory") {
				Object.assign(equipsObject, {
					[equip.type.toLowerCase().replace(" accessory", "Acc")]: equip,
				});
			} else if (equip.type === "Mechanical Heart") {
				Object.assign(equipsObject, { heart: equip });
			} else {
				Object.assign(equipsObject, { [equip.type.toLowerCase()]: equip });
			}
		});

		return equipsObject;
	}, [charInfo.equips, data]);

	const stats = useMemo(() => {
		const pureArcanePower = Object.values(charInfo.symbols.arcane).reduce(
			(sum, symbol) => sum + (symbol.level - 1) * 30 + (symbol.level - 1) * 10,
			0,
		);
		const pureSacredPower = Object.values(charInfo.symbols.arcane).reduce(
			(sum, symbol) => sum + (symbol.level - 1) * 10 + (symbol.level - 1) * 10,
			0,
		);
		const pureStarForce = 0;

		const calculateStats = (stat: Stats) => {
			let apGain: number;

			switch (stat) {
				case "hp":
					apGain = 24;
					break;
				case "mp":
					apGain = 16;
					break;
				default:
					apGain = 1;
					break;
			}

			const pureStats = charInfo.stats[stat] + charInfo.stats.ap[stat] * apGain;
			const addedStats = Object.values(equips).reduce((sum, equip) => sum + equip.stats![stat], 0);
			const baseTotalStats = Math.floor(pureStats + addedStats);

			let symbolGain = 0;
			// @ts-ignore
			if (stat === classes[charInfo.job].mainStat) {
				if (pureArcanePower) {
					symbolGain += pureArcanePower * 100;
				}
				if (pureSacredPower) {
					symbolGain += 500 + pureSacredPower * 200;
				}
			}

			const finalStats = symbolGain;

			return Math.floor(baseTotalStats + finalStats);
		};

		const str = calculateStats("str");
		const dex = calculateStats("dex");
		const int = calculateStats("int");
		const luk = calculateStats("luk");

		const att = Object.values(equips).reduce((product, equip) => {
			return product * (1 - equip.stats!.att / 100);
		}, 100);
		const matt = Object.values(equips).reduce((product, equip) => {
			return product * (1 - equip.stats!.matt / 100);
		}, 100);
		const dmgBonus = 0;
		const finalDmg = 0;
		const ied =
			100 -
			Object.values(equips).reduce((product, equip) => {
				return product * (1 - equip.stats!.ied / 100);
			}, 100);

		// Range formula
		const mastery = classes[charInfo.job].mastery;
		const statValue =
			classes[charInfo.job].mainStat
				.map(mainStat => calculateStats(mainStat))
				.reduce((sum, n) => sum + n, 0) *
				4 +
			classes[charInfo.job].secondaryStat
				.map(secondaryStat => calculateStats(secondaryStat))
				.reduce((sum, n) => sum + n, 0);

		const upperActualRange = Math.round(
			(weaponMultipliers[equips.weapon?.category as string] || 0) * statValue * (att / 100),
		);
		const lowerActualRange = Math.round(upperActualRange * (mastery / 100));

		const upperRange = Math.floor(upperActualRange * (1 + dmgBonus / 100) * (1 + finalDmg / 100));
		const lowerRange = Math.floor(
			(equips.weapon ? 1 : 0) + lowerActualRange * (1 + dmgBonus / 100) * (1 + finalDmg / 100),
		);

		return {
			att,
			arcanePower: pureArcanePower,
			bossDmg: Object.values(equips).reduce((sum, equip) => sum + equip.stats!.bossDmg, 0),
			buffDuration: 0,
			critDmg: 0,
			critRate: 5,
			def:
				1.5 * str +
				0.4 * (dex + luk) +
				Object.values(equips).reduce((sum, equip) => sum + equip.stats!.def, 0),
			dex,
			dmgBonus,
			finalDmg,
			hp: calculateStats("hp"),
			ied,
			int,
			itemDrop: 0,
			jump: 100,
			luk,
			matt,
			mesoDrop: 0,
			mp: calculateStats("mp"),
			lowerRange,
			upperRange,
			sacredPower: pureSacredPower,
			speed: 100,
			stance: 0,
			starForce: pureStarForce,
			statusResistance: 0,
			str,
		};
	}, [charInfo.stats, charInfo.symbols, equips]);

	const updateInfo = useCallback(
		(info: string, value: any) => {
			console.log(info);
			let updatedInfo;
			if (info.includes("ap.")) {
				const stat = info.split(".")[1];

				updatedInfo = {
					...charInfo,
					stats: {
						...charInfo.stats,
						ap: {
							...charInfo.stats.ap,
							available: charInfo.stats.ap.available - value,
							// @ts-ignore
							[stat]: charInfo.stats.ap[stat] + value,
						},
					},
				};
			} else if (info.includes(".")) {
				const keys = info.split(".");
				// @ts-ignore
				const oldValues = charInfo[keys[0]];

				updatedInfo = {
					...charInfo,
					[keys[0]]: {
						...oldValues,
						[keys[1]]: value,
					},
				};
				console.log(updatedInfo);
			} else if (info === "level") {
				let apGain = (value - charInfo.level) * 5;

				if (charInfo.level < 60 && value > 60) apGain += 5;
				if (charInfo.level < 90 && value > 90) apGain += 5;
				if (value < 60 && charInfo.level > 60) apGain -= 5;
				if (value < 90 && charInfo.level > 90) apGain -= 5;

				updatedInfo = {
					...charInfo,
					level: value,
					stats: {
						...charInfo.stats,
						ap: {
							...charInfo.stats.ap,
							available: charInfo.stats.ap.available + apGain,
						},
					},
				};
			} else {
				updatedInfo = { ...charInfo, [info]: value };
			}

			setCharInfo(updatedInfo);

			localStorage.setItem("@MapleSimulator:char_info", JSON.stringify(updatedInfo));
		},
		[charInfo],
	);

	const updateEquips = useCallback(
		(type: string, equipId: number) => {
			if (type === "Mechanical Heart") {
				if (equipId !== charInfo.equips.heart.id) {
					updateInfo("equips.heart", { id: equipId });
				}
			} else {
				type = type.toLowerCase();
				type = type.replace(" accessory", "Acc");

				// @ts-ignore
				if (equipId !== charInfo.equips[type].id) {
					updateInfo(`equips.${type}`, { id: equipId });
				}
			}
		},
		[charInfo.equips, updateInfo],
	);

	const contextData = useMemo(() => {
		const {
			exp,
			fame,
			guild,
			job,
			level,
			name,
			stats: { ap: { available } },
		} = charInfo;

		return { ap: available, equips, exp, fame, guild, job, level, name, stats, updateEquips, updateInfo };
	}, [charInfo, equips, stats, updateEquips, updateInfo]);

	return <CharContext.Provider value={contextData}>{children}</CharContext.Provider>;
};

export const useCharInfo = (): CharInfo => {
	const context = useContextSelector(CharContext, char => ({
		name: char.name,
		level: char.level,
		exp: char.exp,
		job: char.job,
		guild: char.guild,
		fame: char.fame,
	}));
	if (!context) {
		throw new Error("useChar must be used within a CharProvider");
	}

	return context;
};

export const useExp = (): number => {
	const context = useContextSelector(CharContext, char => char.exp);
	if (context === undefined) {
		throw new Error("useExp must be used within a CharProvider");
	}

	return context;
};

export const useCoreStats = (): CoreStats => {
	const context = useContextSelector(CharContext, char => ({
		hp: char.stats.hp,
		mp: char.stats.mp,
	}));
	if (!context) {
		throw new Error("useStats must be used within a CharProvider");
	}

	return context;
};

export const useEquips = () => {
	const context = useContextSelector(CharContext, char => char.equips);
	if (!context) {
		throw new Error("useEquips must be used within a CharProvider");
	}

	return context;
};

export const useStats = () => {
	const context = useContextSelector(CharContext, char => ({
		ap: char.ap,
		...char.stats,
	}));
	if (!context) {
		throw new Error("useStats must be used within a CharProvider");
	}

	return context;
};

export const useFuncs = () => {
	const context = useContextSelector(CharContext, char => ({
		updateInfo: char.updateInfo,
		updateEquips: char.updateEquips,
	}));
	if (!context) {
		throw new Error("useStats must be used within a CharProvider");
	}

	return context;
};
