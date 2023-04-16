"use client";
import { Input } from "@hyoretsu/react-components";

import { useCharInfo, useCoreStats, useFuncs } from "@context/char";

import { CharInfo, LevelName, CoreStatsDiv, StatBar } from "./styles";

const CoreStatsInfo: React.FC = () => {
	const { name, level } = useCharInfo();
	const { hp, mp } = useCoreStats();
	const { updateInfo } = useFuncs();

	const stats = [
		{ stat: "HP", value: hp },
		{ stat: "MP", value: mp },
	];

	return (
		<CharInfo>
			<LevelName>
				<div>
					<label htmlFor="level">Lv.</label>
					<Input
						id="level"
						type="number"
						value={level}
						min={1}
						max={300}
						onChange={(e) => updateInfo("level", e.target.value)}
					/>
				</div>
				<Input value={name} onChange={(e) => updateInfo("name", e.target.value)} maxLength={12} />
			</LevelName>
			<CoreStatsDiv>
				{stats.map(({ stat, value }) => (
					<div key={stat}>
						<span>{stat}</span>
						<StatBar stat={stat}>
							<span>
								{value}/{value}
							</span>
						</StatBar>
					</div>
				))}
			</CoreStatsDiv>
		</CharInfo>
	);
};

export default CoreStatsInfo;
