"use client";
import { useCharacters } from "@context/account";
import classes from "@data/classes.json";
import equips from "@data/items/equips.json";
import { CharacterEquip, Equipment, EquipmentType } from "maple-simulator";
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
