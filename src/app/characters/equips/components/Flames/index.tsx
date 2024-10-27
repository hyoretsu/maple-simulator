"use client";
import { useCharacters } from "@context/account";
import classes from "@data/classes.json";
import type { Equipment, EquipmentType, PlayableClass } from "maple-simulator";
import { useState } from "react";
import styles from "../styles.module.scss";
import FlameEditor from "./FlameEditor";
import { calcFlameScore } from "./utils/calcFlameScore";

interface FlameProps {
	equip?: Equipment;
	index?: number;
	type: EquipmentType;
}

export default function Flames({ equip, index, type }: FlameProps) {
	const { currentCharacter } = useCharacters();
	if (!currentCharacter) {
		return;
	}

	let currentEquip = currentCharacter.equips[type];
	if (Array.isArray(currentEquip)) {
		currentEquip = currentEquip[index as number];
	}

	const [flamesShown, showFlames] = useState(false);

	let flameScore: number;
	if (!currentCharacter.equips[type] || !currentEquip?.flames) {
		flameScore = 0;
	} else {
		flameScore = calcFlameScore(
			currentEquip!.flames,
			classes.find(({ name }) => name === currentCharacter.class) as PlayableClass,
		);
	}

	return (
		<section className={styles.equipSection}>
			<button type="button" onClick={() => showFlames(old => !old)}>
				Flames
			</button>

			{flamesShown && (
				<div>
					<FlameEditor equip={equip} type={type} index={index} />
				</div>
			)}

			<span
				onClick={() => !flamesShown && showFlames(old => !old)}
				style={{ cursor: !flamesShown ? "pointer" : "" }}
			>
				Score: {Number(flameScore.toFixed(3))}
			</span>
		</section>
	);
}
