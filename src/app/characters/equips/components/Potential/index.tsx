"use client";
import { useCharacters } from "@context/account";
import { range } from "@hyoretsu/utils";
import copyObject from "@utils/copyObject";
import { numberOrString } from "@utils/numberOrString";
import type { CharacterEquipment, EquipmentType, Potential as PotentialType } from "maple-simulator";
import { useMemo, useState } from "react";
import styles from "../styles.module.scss";
import {
	allStatValues,
	attValues,
	bossIedValues,
	dmgValues,
	hpMpDefValues,
	mesoDropValues,
	statValues,
} from "./values";

interface PotentialProps {
	equipLevel?: number;
	index?: number;
	type: EquipmentType;
}

const accessoryLines = {
	"Mesos Obtained": mesoDropValues,
	"Item Drop Rate": mesoDropValues,
};
const weaponSecondaryLines = {
	Damage: dmgValues,
	IED: bossIedValues,
	"Boss Damage": bossIedValues,
	"Magic ATT": attValues,
	ATT: attValues,
};
const extraLinesMap = new Map<string, Record<string, Map<number, any[]>>>([
	["Earrings", accessoryLines],
	[
		"Emblem",
		{
			Damage: dmgValues,
			IED: bossIedValues,
			"Magic ATT": attValues,
			ATT: attValues,
		},
	],
	["Eye Accessory", accessoryLines],
	["Face Accessory", accessoryLines],
	[
		"Gloves",
		{
			"Critical Damage": new Map([
				[71, [[null], [null], [null], [null], ["8%"]]],
				[31, [[null], [null], [null], [null], ["6%"]]],
				[0, [[null], [null], [null], [null], ["5%"]]],
			]),
		},
	],
	["Pendant", accessoryLines],
	["Ring", accessoryLines],
	["Secondary Weapon", weaponSecondaryLines],
	["Weapon", weaponSecondaryLines],
]);

// const tiers = ["Common", "Rare", "Epic", "Unique", "Legendary"];
const tierColors = ["#777777", "#55aaff", "#cc66ff", "#ffcc00", "#00ff00"];

export default function Potential({ equipLevel = 0, index, type }: PotentialProps) {
	const { currentCharacter, updateCharacter } = useCharacters();
	if (!currentCharacter || !currentCharacter.equips[type]) {
		return <></>;
	}

	const [lines, setLines] = useState(
		new Map([
			["STR", undefined],
			["DEX", undefined],
			["INT", undefined],
			["LUK", undefined],
			["Max HP", undefined],
			["Max MP", undefined],
			["DEF", undefined],
			["All Stats", undefined],
		]),
	);

	const [potentialShown, showPotential] = useState(false);

	let equip = currentCharacter.equips[type] as CharacterEquipment;
	if (Array.isArray(equip)) {
		equip = equip[index!];
	}

	const values = useMemo(() => {
		const valuesData: Map<string, Array<string | number | null>[]> = new Map([
			["STR", []],
			["DEX", []],
			["INT", []],
			["LUK", []],
			["Max HP", []],
			["Max MP", []],
			["DEF", []],
			["All Stats", []],
			["Critical Damage", []],
		]);

		for (const [level, values] of statValues.entries()) {
			if (equipLevel >= level) {
				valuesData.set("STR", values);
				valuesData.set("DEX", values);
				valuesData.set("INT", values);
				valuesData.set("LUK", values);
				break;
			}
		}

		for (const [level, values] of hpMpDefValues.entries()) {
			if (equipLevel >= level) {
				valuesData.set("Max HP", values);
				valuesData.set("Max MP", values);
				valuesData.set("DEF", values);
				break;
			}
		}

		for (const [level, values] of allStatValues.entries()) {
			if (equipLevel >= level) {
				valuesData.set("All Stats", values);
				break;
			}
		}

		const extraLines = extraLinesMap.get(type);
		if (extraLines) {
			for (const [stat, valuesMap] of Object.entries(extraLines)) {
				setLines(old => {
					const newLines = new Map([[stat, undefined], ...old]);

					return newLines;
				});

				for (const [level, values] of valuesMap) {
					if (equipLevel >= level) {
						valuesData.set(stat, values);
						break;
					}
				}
			}
		}

		return valuesData;
	}, [equipLevel, type]);

	const tier = useMemo(() => {
		let tier = 0;

		if (equip.potential) {
			const firstIndex = equip.potential.findIndex(pot => pot !== null);

			if (firstIndex >= 0) {
				const lineValue = values.get(equip.potential[firstIndex]!.stat);

				if (lineValue) {
					tier = lineValue.findIndex(value => value.includes(equip.potential![firstIndex]!.value));
				}
			}
		}

		return tier;
	}, [equip, values]);

	const handleChange = (stat: string | "", newValue: number | string, potIndex: number) => {
		let newPotential: (PotentialType | null)[] = [...(equip.potential || [null, null, null])];
		newPotential[potIndex] = !stat ? null : { stat, value: newValue };

		if (potIndex === 0) {
			if (!stat) {
				newPotential = [null, null, null];
			} else {
				const newTier = values.get(stat)!.findIndex(valuesArr => valuesArr.find(value => value === newValue));
				if (Math.abs(newTier - tier) > 1) {
					newPotential = [newPotential[0], null, null];
				}
			}
		}

		const newEquip: CharacterEquipment | CharacterEquipment[] = {
			...copyObject(equip),
			potential: newPotential,
		};

		if (index !== undefined) {
			// @ts-ignore
			const newEquipsArr = [...currentCharacter.equips[type]];
			newEquipsArr[Number(index)] = newEquip;

			updateCharacter(currentCharacter.id, {
				equips: {
					[type]: newEquipsArr,
				},
			});
		} else {
			updateCharacter(currentCharacter.id, {
				equips: {
					[type]: newEquip,
				},
			});
		}
	};

	return (
		<section
			className={styles.equipSection}
			style={{
				"--color": tierColors[tier],
			}}
		>
			<button type="button" onClick={() => showPotential(old => !old)}>
				Potential
			</button>

			{potentialShown && (
				<div>
					<select
						value={`${equip.potential?.[0]?.stat}_${equip.potential?.[0]?.value}`}
						onChange={e => {
							const [stat, value] = e.currentTarget.value.split("_");
							handleChange(stat, numberOrString(value), 0);
						}}
					>
						<option value="">N/A</option>
						{[...lines.keys()].map(stat => {
							const lineValues = values
								.get(stat)!
								.slice(tier || 1)
								.filter(values => values[0] !== null);

							return lineValues.map(values =>
								values.map(value => (
									<option key={`${stat}_${value}_1`} value={`${stat}_${value}`}>
										{stat} +{value}
									</option>
								)),
							);
						})}
					</select>

					{range(2).map(index => (
						<select
							key={`potential_${index + 1}`}
							value={`${equip.potential?.[index + 1]?.stat}_${equip.potential?.[index + 1]?.value}`}
							onChange={e => {
								const [stat, value] = e.currentTarget.value.split("_");
								handleChange(stat, numberOrString(value), index + 1);
							}}
						>
							<option value="">N/A</option>
							{[...lines.keys()].map(stat => {
								const lineValues = values.get(stat)!;
								const nonPrimeValues = lineValues.slice(
									(tier || 1) - 1,
									!equip.potential?.[0] ? undefined : (tier || 1) + 1,
								);

								return nonPrimeValues.map(values =>
									values[0] === null
										? null
										: values.map(value => (
												<option key={`${stat}_${value}_${index}`} value={`${stat}_${value}`}>
													{stat} +{value}
												</option>
											)),
								);
							})}
						</select>
					))}
				</div>
			)}
		</section>
	);
}
