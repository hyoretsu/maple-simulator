import { CharacterEquip, PlayableClass } from "maple-simulator";
import { CurrentEquips } from "../../page";
import styles from "./styles.module.scss";

export interface ReportProps {
	characterClass: PlayableClass;
	equips: CurrentEquips;
}

export default function Report({ characterClass, equips }: ReportProps) {
	return (
		<section className={styles.report}>
			<h3>Total Stat% from potentials and flames:</h3>
			<div>
				{[...characterClass.mainStat, ...(characterClass.secondaryStat || [])].map(stat => (
					<p>
						{stat} +
						{equips.reduce((sum, [_, equipPre]) => {
							function execute(equip: CharacterEquip) {
								if (equip) {
									if (equip.flames && stat !== "HP") {
										sum += equip.flames.allStats || 0;
									}

									if (equip.potential) {
										sum += equip.potential
											?.filter(
												potential =>
													potential &&
													(potential.stat === stat || (stat !== "HP" && potential.stat === "All Stats")),
											)
											.reduce((innerSum, potential) => {
												if (potential && typeof potential.value === "string") {
													stat === "STR" && console.log(Number(potential.value.split("%")[0]));
													innerSum += Number(potential.value.split("%")[0]);
												}

												return innerSum;
											}, 0)!;
									}
								}
							}

							if (Array.isArray(equipPre)) {
								for (const equip of equipPre) {
									execute(equip);
								}
							} else {
								execute(equipPre);
							}

							return sum;
						}, 0)}
						%
					</p>
				))}
			</div>
		</section>
	);
}
