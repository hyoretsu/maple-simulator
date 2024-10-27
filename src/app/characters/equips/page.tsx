"use client";
import { useCharacters } from "@context/account";
import classes from "@data/classes.json";
import equips from "@data/items/equips.json";
import type { CharacterEquip, Equipment, EquipmentType } from "maple-simulator";
import { useMemo } from "react";
import EquipDisplay from "./components/EquipDisplay";
import Report from "./components/Report";
import styles from "./styles.module.scss";

export type CurrentEquips = [string, CharacterEquip | CharacterEquip[]][];

export default function Equips() {
	const { currentCharacter } = useCharacters();
	if (!currentCharacter) {
		return;
	}

	const currentEquips = useMemo<CurrentEquips>(() => {
		return Object.entries(currentCharacter.equips);
	}, [currentCharacter]);

	const characterClass = classes.find(givenClass => givenClass.name === currentCharacter.class)!;

	const filteredEquips = useMemo(() => {
		return currentEquips.reduce(
			(obj, [type]) => {
				const isTop = type === "Top";

				Object.assign(obj, {
					[type]: equips
						.filter(equipData => {
							let sameType: boolean;
							if (type === "Weapon") {
								sameType = characterClass.weapons.includes(equipData.type!);
							} else if (type === "Secondary Weapon") {
								sameType = characterClass.subWeapons.includes(equipData.type!);

								// Avoid Warriors with two-handed weapons+shields and mismatched Explorer mage secondary weapons
								if (
									sameType &&
									((characterClass.branch === "Warrior" &&
										equipData.type === "Shield" &&
										equips
											.find(equip => equip.id === currentCharacter.equips.Weapon?.id)
											?.type!.includes("Two-handed")) ||
										(equipData.type !== "Shield" &&
											((characterClass.name === "Bishop" && !equipData.name.includes("Gold")) ||
												(characterClass.name === "Magician (Fire, Poison)" &&
													!equipData.name.includes("Rusty") &&
													!equipData.name.includes("Flaming")) ||
												(characterClass.name === "Magician (Ice, Lightning)" &&
													!equipData.name.includes("Metallic") &&
													!equipData.name.includes("Damp")))))
								) {
									sameType = false;
								}
							} else if (type === "Emblem") {
								sameType = [
									1190400,
									1190401,
									1190402,
									1190403,
									1190404,
									1190405,
									1190406,
									1190500,
									1190501,
									1190502,
									1190503,
									1190528,
									1190541,
									1190545,
									1190555,
									1190556,
									1190557,
									1190558,
									1190559,
									...characterClass.emblems,
								].includes(equipData.id);
							} else {
								sameType = (isTop && equipData.type === "Overall") || equipData.type === type;
							}

							const belowLevel =
								!equipData.requirements?.level || equipData.requirements.level <= currentCharacter.level;

							let sameJob = !equipData.requirements?.job;
							if (!sameJob) {
								if (currentCharacter.class === "Xenon") {
									sameJob =
										equipData.requirements?.job === "Thief" ||
										equipData.requirements?.job === "Pirate" ||
										equipData.requirements?.job === "Xenon";
								} else {
									sameJob = equipData.requirements?.job === characterClass.branch;
								}
							}

							return sameType && belowLevel && sameJob;
						})
						.sort((equipA, equipB) => {
							const sortedEquips = [equipA.name, equipB.name].sort();

							return sortedEquips[0] === equipA.name ? -1 : 1;
						}),
				});

				return obj;
			},
			{} as Record<EquipmentType, Equipment[]>,
		);
	}, [characterClass, currentEquips, currentCharacter]);

	return (
		<>
			<Report characterClass={characterClass} equips={currentEquips} />

			<section className={styles.equipManager}>
				{currentEquips.map(([type, equip]) => {
					if (Array.isArray(equip)) {
						return equip.map((subEquip, index) => (
							<EquipDisplay
								// biome-ignore lint/suspicious/noArrayIndexKey: Indexes won't change
								key={`${type}-${index}`}
								index={index}
								type={type as EquipmentType}
								equip={subEquip}
								equips={filteredEquips}
							/>
						));
					}

					return (
						<EquipDisplay key={type} type={type as EquipmentType} equip={equip} equips={filteredEquips} />
					);
				})}
			</section>
		</>
	);
}
