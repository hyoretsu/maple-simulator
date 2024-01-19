"use client";
import { useCharacters } from "@context/account";
import { CharacterEquip, Equipment, EquipmentType } from "maple-simulator";
import { HTMLAttributes } from "react";
import Flames from "./Flames";
import Potential from "./Potential";
import Stars from "./Stars";
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

	let isFlammable: boolean | undefined = currentEquipData?.flammable;
	let isPottable: boolean | undefined = currentEquipData?.pottable;
	let isStarrable: boolean | undefined = currentEquipData?.starrable;
	switch (type) {
		case "Android":
		case "Badge":
		case "Medal":
		case "Totem": {
			isFlammable ??= false;
			isPottable ??= false;
			isStarrable ??= false;
			break;
		}
		case "Emblem":
		case "Heart":
		case "Ring": {
			isFlammable ??= false;
			isPottable ??= true;
			isStarrable ??= false;
			break;
		}
		case "Pocket": {
			isFlammable ??= true;
			isPottable ??= false;
			isStarrable ??= false;
			break;
		}
		case "Secondary Weapon": {
			// Todo: implement
			// if (currentCharacter.class !== "Kanna") {
			isFlammable ??= false;
			// }

			isPottable ??= true;
			isStarrable ??= false;
			break;
		}
		case "Shoulder": {
			isFlammable ??= false;
			isPottable ??= true;
			isStarrable ??= true;
			break;
		}
		default: {
			isFlammable ??= true;
			isPottable ??= true;
			isStarrable ??= true;
			break;
		}
	}

	const changeEquip = (id: number) => {
		const newEquip = !id ? null : { id };

		if (type === "Ring" || type === "Totem" || type === "Pendant") {
			const newEquips = [...currentCharacter.equips[type]];
			newEquips[index as number] = newEquip;

			updateCharacter(currentCharacter.id, {
				equips: {
					[type]: newEquips,
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
		<div className={styles.equipDisplay} {...rest}>
			<label htmlFor="equip">{type}</label>
			<select name="equip" value={equip?.id || ""} onChange={e => changeEquip(Number(e.currentTarget.value))}>
				<option value={0}>N/A</option>
				{equips[type].map(({ id, name }) => {
					return (
						<option key={id} value={id}>
							{name}
						</option>
					);
				})}
			</select>

			<div className={styles.equipIcon}>
				{currentEquipData && (
					<img src={`/images/assets/${currentEquipData.icon || currentEquipData.id}.png`} alt="" />
				)}
			</div>

			{currentEquipData && (
				<>
					{isStarrable && (
						<Stars type={type} index={index} equipLevel={currentEquipData.requirements?.level} />
					)}
					{isFlammable && <Flames type={type} index={index} equip={currentEquipData} />}
					{isPottable && (
						<Potential type={type} index={index} equipLevel={currentEquipData.requirements?.level} />
					)}
				</>
			)}
		</div>
	);
}
