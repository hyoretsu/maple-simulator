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

	let isFlammable = true;
	let isPottable = true;
	let isStarrable = true;
	switch (type) {
		case "Android":
		case "Medal": {
			isFlammable = false;
			isPottable = false;
			isStarrable = false;
			break;
		}
		case "Emblem":
		case "Heart": {
			isFlammable = false;
			isStarrable = false;
			break;
		}
		case "Pocket": {
			isPottable = false;
			isStarrable = false;
			break;
		}
		case "Badge": {
			isFlammable = false;

			const starPotWhitelist = ["Ghost Ship Exorcist", "Sengoku Hakase"];
			if (!starPotWhitelist.find(equip => equip === currentEquipData?.name)) {
				isPottable = false;
				isStarrable = false;
			}

			break;
		}
		case "Ring": {
			isFlammable = false;

			const starWhitelist = [
				"Cracked Gollux Ring",
				"Dawn Guardian Angel Ring",
				"Endless Terror",
				"Guardian Angel Ring",
				"Kanna's Treasure",
				"Meister Ring",
				"Reinforced Gollux Ring",
				"Silver Blossom Ring",
				"Solid Gollux Ring",
				"Superior Gollux Ring",
			];
			if (!starWhitelist.find(equip => equip === currentEquipData?.name)) {
				isStarrable = false;
			}

			break;
		}
		case "Shoulder": {
			isFlammable = false;
			break;
		}
		case "Secondary Weapon": {
			// Todo: implement
			// if (currentCharacter.class !== "Kanna") {
			isFlammable = false;
			// }

			break;
		}
		case "Totem": {
			isPottable = false;
			isStarrable = false;

			if (currentEquipData?.name !== "Ancient Slate Replica") {
				isFlammable = false;
			}

			break;
		}
		// Weapons
		default:
			break;
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
