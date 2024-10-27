"use client";
import { useCharacters } from "@context/account";
import { range } from "@hyoretsu/utils";
import copyObject from "@utils/copyObject";
import type { CharacterEquipment, EquipmentType } from "maple-simulator";
import { useMemo } from "react";
import { IoStar } from "react-icons/io5";
import styles from "./styles.module.scss";

const starCount = [
	[137, 25],
	[128, 20],
	[118, 15],
	[108, 10],
	[95, 8],
	[0, 5],
];

interface StarsProps {
	equipLevel?: number;
	index?: number;
	type: EquipmentType;
}

export default function Stars({ equipLevel = 0, index, type }: StarsProps) {
	const { currentCharacter, updateCharacter } = useCharacters();
	if (!currentCharacter || !currentCharacter.equips[type]) {
		return <></>;
	}

	const stars = useMemo(() => {
		return range(type === "Badge" ? 22 : starCount.find(([level]) => equipLevel >= level)![1]);
	}, [equipLevel, type]);

	let equip = currentCharacter.equips[type] as CharacterEquipment;
	if (Array.isArray(equip)) {
		equip = equip[index!];
	}

	const handleClick = (newStars?: number) => {
		if (newStars === equip?.stars) {
			newStars = 0;
		}

		const newEquip: CharacterEquipment | CharacterEquipment[] = {
			...copyObject(equip),
			id: equip!.id,
			stars: newStars,
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
		<div className={styles.stars}>
			{stars.map(star => (
				<div key={star}>
					<IoStar
						onClick={() => handleClick(star + 1)}
						style={{
							color: equip?.stars && equip.stars > star ? "#ffdd00" : "#ffffff",
						}}
					/>
				</div>
			))}
		</div>
	);
}
