"use client";
import { Input } from "@hyoretsu/react-components";
import { useCharInfo, useCoreStats, useFuncs } from "context/char";
import styles from "./styles.module.scss";

export default function CoreStatsInfo() {
	const { name, level } = useCharInfo();
	const { hp, mp } = useCoreStats();
	const { updateInfo } = useFuncs();

	const stats = [
		{ stat: "HP", value: hp },
		{ stat: "MP", value: mp },
	];

	return (
		<div className={styles.charInfo}>
			<div className={styles.levelName}>
				<div>
					<label htmlFor="level">Lv.</label>
					<Input
						id="level"
						type="number"
						value={level}
						min={1}
						max={300}
						onChange={e => updateInfo("level", e.target.value)}
					/>
				</div>
				<Input value={name} onChange={e => updateInfo("name", e.target.value)} maxLength={12} />
			</div>
			<div className={styles.coreStatsDiv}>
				{stats.map(({ stat, value }) => {
					let colors = "";
					switch (stat.toLowerCase()) {
						case "hp":
							colors = "#f32c64, #f64c79";
							break;
						case "mp":
							colors = "#11b2dd, #6de5fe";
							break;
					}

					return (
						<div key={stat}>
							<span>{stat}</span>
							<div
								className={styles.statBar}
								style={{
									background: `linear-gradient(90deg, ${colors} 90%)`,
								}}
							>
								<span>
									{value}/{value}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
