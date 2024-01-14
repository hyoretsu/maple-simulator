"use client";
import { useCharacters } from "@context/account";
import { CharacterEquip, Equipment, EquipmentType } from "maple-simulator";
import { HTMLAttributes } from "react";
import Flames from "./Flames";
import styles from "./styles.module.scss";

export interface EquipDisplayProps extends HTMLAttributes<HTMLDivElement> {
	equip: CharacterEquip;
	equips: Record<string, Equipment[]>;
	index?: number;
	type: EquipmentType;
}

export default function EquipDisplay({ equip, equips, index, type, ...rest }: EquipDisplayProps) {
	const { currentCharacter, updateCharacter } = useCharacters();
	if (!currentCharacter) {
		return;
	}

	const currentEquipData = equips[type].find(equipData => equipData.id === equip?.id);

	let isFlammable = true;
	switch (type) {
		case "Android":
		case "Badge":
		case "Emblem":
		case "Heart":
		case "Medal":
		case "Ring":
		case "Shoulder":
		// Todo: implement
		case "Weapon":
			isFlammable = false;
			break;
		case "Secondary Weapon":
			// Todo: implement
			// if (currentCharacter.class !== "Kanna") {
			isFlammable = false;
			// }

			break;
		case "Totem":
			if (currentEquipData?.name !== "Ancient Slate Replica") {
				isFlammable = false;
			}

			break;
	}

	const changeEquip = (id: number) => {
		if (type === "Ring" || type === "Totem" || type === "Pendant") {
			const newEquips = [...currentCharacter.equips[type]];
			newEquips[index as number] = { id };

			updateCharacter(currentCharacter.id, {
				equips: {
					[type]: newEquips,
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
	};

	return (
		<div className={styles.equipDisplay} {...rest}>
			<label htmlFor="equip">{type}</label>
			<select name="equip" value={equip?.id || ""} onChange={e => changeEquip(Number(e.currentTarget.value))}>
				<option value="" hidden />
				{equips[type].map(({ id, name }) => {
					return (
						<option key={id} value={id}>
							{name}
						</option>
					);
				})}
			</select>

			<div>
				{currentEquipData && (
					<img src={`/images/assets/${currentEquipData.icon || currentEquipData.id}.png`} alt="" />
				)}
			</div>

			{currentEquipData && isFlammable && <Flames type={type} index={index} equip={currentEquipData} />}
		</div>
	);
}
