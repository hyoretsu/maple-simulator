"use client";
import { useCharacters } from "@context/account";
import classes from "@data/classes.json";
import { CharacterEquip, Equipment, EquipmentType, Flames, PlayableClass, Stat } from "maple-simulator";
import { Dispatch, HTMLAttributes, SetStateAction, useEffect } from "react";
import styles from "../styles.module.scss";

export interface EquipDisplayProps extends HTMLAttributes<HTMLDivElement> {
	equip: CharacterEquip;
	equips: Record<string, Equipment[]>;
	index?: number;
	state: [string, Dispatch<SetStateAction<string>>];
	type: EquipmentType;
}

export default function EquipDisplay({
	equip,
	equips,
	index,
	state: [selectedEquip, selectEquip],
	type,
	...rest
}: EquipDisplayProps) {
	const { currentCharacter, updateCharacter } = useCharacters();
	if (!currentCharacter) {
		return;
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		selectEquip("");
	}, [currentCharacter.id]);

	const {
		branch,
		mainStat,
		name: job,
		secondaryStat,
	} = classes.find(({ name }) => name === currentCharacter.class) as PlayableClass;
	let currentEquip = currentCharacter.equips[type];
	if (Array.isArray(currentEquip)) {
		currentEquip = currentEquip[index as number];
	}

	const currentEquipData = equips[type].find(equipData => equipData.id === equip?.id);

	const typeToSelect = typeof index !== "undefined" ? `${type}-${index}` : type;

	let flameScore: number;
	if (!currentCharacter.equips[type] || !currentEquip?.flames) {
		flameScore = 0;
	} else {
		flameScore = Object.entries(currentEquip!.flames as Flames).reduce((total, [stat, value]) => {
			if (stat === "allStats") {
				if (job === "Xenon") {
					value *= 22;
				} else {
					value *= 9;
				}
			} else if (stat === "att" || stat === "mAtt") {
				if (branch === "Magician") {
					if (stat === "mAtt") {
						if (job === "Kanna") {
							value *= 2.5;
						} else {
							value *= 3;
						}
					} else {
						value = 0;
					}
				} else if (stat === "att") {
					value *= 3;
				} else {
					value = 0;
				}
			} else {
				stat = stat.toUpperCase();

				if (Array.isArray(mainStat) ? mainStat.includes(stat as Stat) : mainStat === stat) {
				} else if (
					Array.isArray(secondaryStat) ? secondaryStat.includes(stat as Stat) : secondaryStat === stat
				) {
					value /= 10;
				} else if ((job === "Kanna" && stat === "HP") || stat === "MP") {
					value /= 280;
				} else {
					value = 0;
				}
			}

			return total + value;
		}, 0);
	}

	return (
		<div className={styles.equipDisplay} {...rest}>
			<label htmlFor="equip">{type}</label>

			<div>
				{currentEquipData && (
					<img src={`/images/assets/${currentEquipData?.icon || currentEquipData?.id}.png`} alt="" />
				)}
			</div>

			<select
				name="equip"
				value={equip?.id || ""}
				onChange={e => {
					const id = Number(e.currentTarget.value);

					if (type === "Pendant") {
						const newPendants = [...currentCharacter.equips.Pendant];
						newPendants[index as number] = { id };

						updateCharacter(currentCharacter.id, {
							equips: {
								Pendant: newPendants,
							},
						});
					} else {
						updateCharacter(currentCharacter.id, {
							equips: {
								[type]: {
									id,
								},
							},
						});
					}
				}}
			>
				<option value="" hidden />
				{equips[type].map(({ id, name }) => {
					return (
						<option key={id} value={id}>
							{name}
						</option>
					);
				})}
			</select>

			<span>Score: {Number(flameScore.toFixed(3))}</span>

			<input
				type="checkbox"
				checked={typeToSelect === selectedEquip}
				onChange={() => {
					selectEquip(old => {
						const newValue = old === typeToSelect ? "" : typeToSelect;
						if (newValue) {
							window.scrollTo({ top: 0, behavior: "smooth" });
						}

						return newValue;
					});
				}}
			/>
		</div>
	);
}
