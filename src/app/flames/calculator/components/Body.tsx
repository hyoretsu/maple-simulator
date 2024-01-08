"use client";
import { useCharacters } from "@context/account";
import classes from "@data/classes.json";
import equips from "@data/items/equips.json";
import { Equipment, EquipmentType } from "maple-simulator";
import { useMemo, useState } from "react";
import styles from "../styles.module.scss";
import EquipDisplay from "./EquipDisplay";
import FlameEditor from "./FlameEditor";

const nonFlamableEquipTypes = [
	"Android",
	"Badge",
	"Emblem",
	"Heart",
	"Medal",
	"Ring",
	"Secondary Weapon",
	"Shoulder",
	// Todo: implement
	"Weapon",
];

export default function Body() {
	const { currentCharacter } = useCharacters();
	if (!currentCharacter) {
		return;
	}

	const [selectedEquip, selectEquip] = useState("");

	const currentEquips = useMemo(() => {
		return Object.entries(currentCharacter.equips);
	}, [currentCharacter]);

	const filteredEquips = useMemo(() => {
		return currentEquips.reduce(
			(obj, [type]) => {
				const isTop = type === "Top";

				Object.assign(obj, {
					[type]: equips
						.filter(equipData => {
							const sameType = (isTop && equipData.type === "Overall") || equipData.type === type;
							const belowLevel =
								!equipData.requirements?.level || equipData.requirements.level <= currentCharacter.level;

							let sameJob = !equipData.requirements?.job;
							if (!sameJob) {
								if (currentCharacter.class === "Xenon") {
									sameJob =
										equipData.requirements?.job === "Thief" || equipData.requirements?.job === "Pirate";
								} else {
									sameJob =
										equipData.requirements?.job ===
										classes.find(givenClass => givenClass.name === currentCharacter.class)!.branch;
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
	}, [currentEquips, currentCharacter]);

	return (
		<div className={styles.body}>
			<FlameEditor equips={filteredEquips} selectedEquip={selectedEquip} />

			<section className={styles.equipManager}>
				{currentEquips.map(([type, equip]) => {
					if (
						// Todo: implement
						// !(currentCharacter.class === "Kanna" && type === "Secondary Weapon") &&
						nonFlamableEquipTypes.includes(type)
					) {
						return <></>;
					}

					if (Array.isArray(equip)) {
						return equip.map((subEquip, index) => (
							<EquipDisplay
								key={`${type}${index}`}
								index={index}
								type={type as EquipmentType}
								equip={subEquip}
								equips={filteredEquips}
								state={[selectedEquip, selectEquip]}
							/>
						));
					}

					return (
						<EquipDisplay
							key={type}
							type={type as EquipmentType}
							equip={equip}
							equips={filteredEquips}
							state={[selectedEquip, selectEquip]}
						/>
					);
				})}
			</section>
		</div>
	);
}
