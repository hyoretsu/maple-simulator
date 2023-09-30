"use client";
import { Input } from "@hyoretsu/react-components";

import Button from "@components/Button";
import LevelButton from "@components/LevelButton";
import Window from "@components/Window";

import { classes, useCharInfo, useCoreStats, useFuncs, useStats } from "@context/char";

import Arrow from "@assets/Arrow.svg";

import { Background, Info, AbilityPoint, Tabs } from "./styles";

const Stats: React.FC = () => {
	const { name, job, guild, fame } = useCharInfo();
	const { hp, mp } = useCoreStats();
	const { ap, dex, int, lowerRange, luk, str, upperRange } = useStats();
	const { updateInfo } = useFuncs();

	return (
		<Window title="Character Stats" size={[212, 336]} style={{ marginLeft: 1, marginRight: 1 }}>
			<Background>
				<div>
					<Info>
						<label htmlFor="name">Name</label>
						<Input id="name" value={name} onChange={e => updateInfo("name", e.target.value)} maxLength={12} />
					</Info>
					<Info>
						<label htmlFor="job">Job</label>
						<select id="job" value={job} onChange={e => updateInfo("job", e.target.value)}>
							{Object.keys(classes).map(job => (
								<option key={job} value={job}>
									{job}
								</option>
							))}
						</select>
					</Info>
					<Info>
						<label htmlFor="guild">Guild</label>
						<Input
							id="guild"
							placeholder="-"
							value={guild}
							onChange={e => updateInfo("guild", e.target.value)}
						/>
					</Info>
					<Info>
						<label htmlFor="fame">Fame</label>
						<Input
							id="fame"
							type="number"
							maxLength={4}
							value={fame}
							onChange={e => updateInfo("fame", e.target.value)}
						/>
					</Info>
					<Info isBig>
						<span>Damage</span>
						<div>
							<span>{lowerRange}</span>
							<span>~ {upperRange}</span>
						</div>
					</Info>
					<Info stat>
						<label htmlFor="hp">HP</label>
						<Input
							id="hp"
							type="number"
							value={hp}
							min={50}
							max={500000}
							onChange={e => updateInfo("stats.hp", e.target.value)}
						/>
						<LevelButton disabled={!ap} />
					</Info>
					<Info stat>
						<label htmlFor="mp">MP</label>
						<Input
							id="mp"
							type="number"
							value={mp}
							min={5}
							max={500000}
							onChange={e => updateInfo("stats.mp", e.target.value)}
						/>
						<LevelButton disabled={!ap} />
					</Info>
				</div>
				<AbilityPoint>
					<div>
						<span>Ability Point</span>
						<span>{ap}</span>
					</div>
					<button type="button" onClick={() => updateInfo(`ap.${classes[job].mainStat}`, ap)} disabled={!ap}>
						Auto-assign
					</button>
				</AbilityPoint>
				<div>
					<Info stat>
						<label htmlFor="str">STR</label>
						<Input id="str" type="number" value={str} />
						<LevelButton onClick={() => updateInfo("ap.str", 1)} disabled={!ap} />
					</Info>
					<Info stat>
						<label htmlFor="dex">DEX</label>
						<Input id="dex" type="number" value={dex} />
						<LevelButton onClick={() => updateInfo("ap.dex", 1)} disabled={!ap} />
					</Info>
					<Info stat>
						<label htmlFor="int">INT</label>
						<Input id="int" type="number" value={int} />
						<LevelButton onClick={() => updateInfo("ap.int", 1)} disabled={!ap} />
					</Info>
					<Info stat>
						<label htmlFor="luk">LUK</label>
						<Input id="luk" type="number" value={luk} />
						<LevelButton onClick={() => updateInfo("ap.luk", 1)} disabled={!ap} />
					</Info>
				</div>
				<Tabs>
					<Button border="#89ab43" colors={["#d7fc00", "#88bf00"]} size={[68, 14]}>
						<Arrow style={{ transform: "rotate(90deg)" }} />
						<span>Hyper Stat</span>
					</Button>
					<Button border="#89ab43" colors={["#d7fc00", "#88bf00"]} size={[68, 14]}>
						<span>Detail</span>
						<Arrow style={{ transform: "rotate(-90deg)" }} />
					</Button>
				</Tabs>
			</Background>
		</Window>
	);
};

export default Stats;
