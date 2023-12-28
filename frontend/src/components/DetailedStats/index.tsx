"use client";
import { round } from "@hyoretsu/utils";
import Window from "components/Window";
import { useCharInfo, useStats } from "context/char";
import { Info, Line } from "./components";
import styles from "./styles.module.scss";

// const innerAbilityColors = {
// 	none: ["#556", "#777"],
// };

// const innerAbilityText = {
// 	none: "Ability",
// 	rare: "Rare Ability",
// 	epic: "Epic Ability",
// 	unique: "Unique Ability",
// 	legendary: "Legendary Ability",
// };

export default function DetailedStats() {
	const { level } = useCharInfo();
	const {
		arcanePower,
		bossDmg,
		buffDuration,
		critDmg,
		critRate,
		def,
		dmgBonus,
		ied,
		itemDrop,
		finalDmg,
		jump,
		lowerRange,
		mesoDrop,
		sacredPower,
		speed,
		stance,
		starForce,
		statusResistance,
		upperRange,
	} = useStats();

	return (
		<Window closeButton={false} size={[243, 394]}>
			<div className={styles.background}>
				<div style={{ borderBottom: "1px solid #aaa", padding: "4px 4px 6px 4px" }}>
					<div className={styles.title}>
						<div />
						<p>Detailed Stats</p>
					</div>
					<Info>
						<span>
							Damage
							<br />
							Range
						</span>
						<div style={{ padding: 0 }}>
							<span>{lowerRange}</span>
							<span>~ {upperRange}</span>
						</div>
					</Info>
					<Line>
						<Info>
							<span>Damage</span>
							<span>{dmgBonus}%</span>
						</Info>
						<Info>
							<span>Boss Damage</span>
							<span>{bossDmg}%</span>
						</Info>
					</Line>
					<Line>
						<Info>
							<span>Final Damage</span>
							<span>{finalDmg}%</span>
						</Info>
						<Info>
							<span>Buff Duration</span>
							<span>{buffDuration}%</span>
						</Info>
					</Line>
					<Line>
						<Info>
							<span style={{ marginLeft: 3 }}>
								Ignore Enemy
								<br />
								Defense
							</span>
							<span style={{ lineHeight: "18px" }}>{round(ied, 2)}%</span>
						</Info>
						<Info>
							<span style={{ marginLeft: 3 }}>
								Item Drop
								<br />
								Rate
							</span>
							<span style={{ lineHeight: "18px" }}>{itemDrop}%</span>
						</Info>
					</Line>
					<Line>
						<Info>
							<span>Critical Rate</span>
							<span style={{ lineHeight: "18px" }}>{critRate}%</span>
						</Info>
						<Info>
							<span style={{ marginLeft: 3 }}>
								Mesos
								<br />
								Obtained
							</span>
							<span style={{ lineHeight: "18px" }}>{mesoDrop}%</span>
						</Info>
					</Line>
					<Info>
						<span style={{ marginLeft: 3 }}>
							Critical
							<br />
							Damage
						</span>
						<span style={{ lineHeight: "18px" }}>{critDmg}%</span>
					</Info>
					<Line>
						<Info>
							<span style={{ marginLeft: 3 }}>
								Status
								<br />
								Resistance
							</span>
							<span style={{ lineHeight: "18px" }}>{statusResistance}</span>
						</Info>
						<Info>
							<span style={{ marginLeft: 3 }}>
								Knockback
								<br />
								Resistance
							</span>
							<span style={{ lineHeight: "18px" }}>{stance}%</span>
						</Info>
					</Line>
					<Line>
						<Info>
							<span>Defense</span>
							<span>{Math.round(def)}</span>
						</Info>
						{level > 100 && (
							<Info>
								<span>Star Force</span>
								<span>{starForce}</span>
							</Info>
						)}
					</Line>
					<Line>
						<Info>
							<span>Speed</span>
							<span style={level > 200 ? { lineHeight: "18px" } : {}}>{speed}%</span>
						</Info>
						{level > 200 && (
							<Info>
								<span style={{ marginLeft: 3 }}>
									Arcane
									<br />
									Power
								</span>
								<span style={{ lineHeight: "18px" }}>{arcanePower}</span>
							</Info>
						)}
					</Line>
					<Line>
						<Info>
							<span>Jump</span>
							<span style={level > 260 ? { lineHeight: "18px" } : {}}>{jump}%</span>
						</Info>
						{level > 260 && (
							<Info>
								<span style={{ marginLeft: 3 }}>
									Sacred
									<br />
									Power
								</span>
								<span style={{ lineHeight: "18px" }}>{sacredPower}</span>
							</Info>
						)}
					</Line>
				</div>
				{/* <div>
					<Title
						style={{
							backgroundColor: innerAbilityColors["none"][1],
							borderColor: innerAbilityColors["none"][0],
							marginTop: 4,
						}}
					>
						<div style={{ backgroundColor: innerAbilityColors["none"][0] }} />
						<p style={{ marginLeft: 12 }}>{innerAbilityText["none"]}</p>
					</Title>
				</div> */}
			</div>
		</Window>
	);
}
