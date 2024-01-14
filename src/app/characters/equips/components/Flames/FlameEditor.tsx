"use client";
import StyledModal from "@components/StyledModal";
import { useCharacters } from "@context/account";
import classes from "@data/classes.json";
import { Input } from "@hyoretsu/react-components";
import copyObject from "@utils/copyObject";
import { CharacterEquipment, Equipment, EquipmentType, PlayableClass } from "maple-simulator";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import styles from "./styles.module.scss";

export interface FlameEditorProps {
	equip?: Equipment;
	index?: number;
	type: EquipmentType;
}

const statLimits = [
	[250, 231],
	[230, 210],
	[200, 203],
	[180, 175],
	[160, 168],
	[140, 140],
	[120, 133],
	[100, 105],
	[80, 98],
	[60, 70],
	[40, 63],
	[20, 35],
	[0, 28],
];
const hpMpLimits = [
	[250, 4900],
	[240, 4760],
	[230, 4620],
	[220, 4480],
	[210, 4340],
	[200, 4200],
	[190, 3990],
	[180, 3780],
	[170, 3570],
	[160, 3360],
	[150, 3150],
	[140, 2940],
	[130, 2730],
	[120, 2520],
	[110, 2310],
	[100, 2100],
	[90, 1890],
	[80, 1680],
	[70, 1470],
	[60, 1260],
	[50, 1050],
	[40, 840],
	[30, 630],
	[20, 420],
	[10, 210],
	[0, 21],
];

export default function FlameEditor({ equip: equipData, type, index }: FlameEditorProps) {
	const { currentCharacter, updateCharacter } = useCharacters();
	if (!currentCharacter) {
		return <></>;
	}

	const [kannaModalVisible, showKannaModal] = useState(false);

	const { branch, mainStat, secondaryStat } = classes.find(
		givenClass => givenClass.name === currentCharacter.class,
	) as PlayableClass;
	const statLimit = statLimits.find(([level]) => (equipData?.requirements.level || 0) >= level)![1];
	const hpMpLimit = hpMpLimits.find(([level]) => (equipData?.requirements.level || 0) >= level)![1];

	let equip = currentCharacter.equips[type] as CharacterEquipment;
	if (Array.isArray(equip)) {
		equip = equip[index!];
	}

	const handleChange = (stat: string, value: number) => {
		const newEquip: CharacterEquipment | CharacterEquipment[] = {
			...copyObject(equip),
			flames: {
				...equip!.flames,
				[stat]: value,
			},
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
		<>
			<section className={styles.flameEditor}>
				{mainStat.map(stat => {
					const statName = stat.toLowerCase();

					return (
						<fieldset key={stat}>
							<span>{stat}</span>

							<Input
								type="number"
								// @ts-ignore
								value={equip?.flames?.[statName] || ""}
								placeholder="0"
								min={0}
								max={statName === "hp" ? hpMpLimit : statLimit}
								onChange={e => handleChange(statName, Number(e.currentTarget.value))}
							/>
						</fieldset>
					);
				})}

				{secondaryStat?.map(stat => {
					const statName = stat.toLowerCase();

					return (
						<fieldset key={stat}>
							<span>{stat}</span>

							<Input
								type="number"
								// @ts-ignore
								value={equip?.flames?.[statName] || ""}
								placeholder="0"
								min={0}
								max={statLimit}
								onChange={e => handleChange(statName, Number(e.currentTarget.value))}
							/>
						</fieldset>
					);
				})}

				{currentCharacter.class === "Kanna" && (
					<>
						<fieldset>
							<div>
								<span>Max HP</span>
								<AiOutlineQuestionCircle onClick={() => showKannaModal(true)} />
							</div>

							<Input
								type="number"
								value={equip?.flames?.hp || ""}
								placeholder="0"
								min={0}
								max={hpMpLimit}
								onChange={e => handleChange("hp", Number(e.currentTarget.value))}
							/>
						</fieldset>
						<fieldset>
							<div>
								<span>Max HP</span>
								<AiOutlineQuestionCircle onClick={() => showKannaModal(true)} />
							</div>

							<Input
								type="number"
								value={equip?.flames?.mp || ""}
								placeholder="0"
								min={0}
								max={hpMpLimit}
								onChange={e => handleChange("mp", Number(e.currentTarget.value))}
							/>
						</fieldset>
					</>
				)}

				{branch !== "Magician" ? (
					<fieldset>
						<span>Attack Power</span>
						<Input
							type="number"
							value={equip?.flames?.att || ""}
							placeholder="0"
							min={0}
							max={7}
							onChange={e => handleChange("att", Number(e.currentTarget.value))}
						/>
					</fieldset>
				) : (
					<fieldset>
						<span>Magic Attack</span>
						<Input
							type="number"
							value={equip?.flames?.mAtt || ""}
							placeholder="0"
							min={0}
							max={7}
							onChange={e => handleChange("mAtt", Number(e.currentTarget.value))}
						/>
					</fieldset>
				)}

				<fieldset>
					<span>All Stats</span>
					<Input
						type="number"
						value={equip?.flames?.allStats || ""}
						placeholder="0"
						min={0}
						max={7}
						onChange={e => handleChange("allStats", Number(e.currentTarget.value))}
					/>
				</fieldset>
			</section>

			{kannaModalVisible && (
				<StyledModal onConfirm={() => showKannaModal(false)}>
					<p>
						I asked for the opinion of Kanna mains over at their Discord server. Some don't consider HP/MP
						flames, some said that it'll vary depending on progression.
					</p>
					<p>
						But since this release is a static calculator (without Stat Equivalence, for now) it's reasonable
						to set it as 1/700*2.5 or 1/280 by converting HP/MP{"->"}M.ATT{"->"}INT.
					</p>
					<p>
						This means that a T7 HP/MP flame in a lv250 Eternal equip only translates to 17.5 flame score.
						That's a lot more reasonable than the original 1/100 ratio.
					</p>
				</StyledModal>
			)}
		</>
	);
}
