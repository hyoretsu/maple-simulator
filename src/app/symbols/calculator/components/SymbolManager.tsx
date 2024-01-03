"use client";
import { useCharacters } from "@context/account";
import symbolInfo from "@data/symbols.json";
import { Input } from "@hyoretsu/react-components";
import { Equipment, SymbolData, SymbolType } from "maple-simulator";
import Image from "next/image";
import styles from "../styles.module.scss";

interface SymbolManagerProps {
	symbols: Equipment[];
	type?: SymbolType;
}

const maxLevels = {
	Arcane: 20,
	Sacred: 11,
};

export default function SymbolManager({ symbols, type = "" as SymbolType }: SymbolManagerProps) {
	const { currentCharacter, updateCharacter } = useCharacters();
	if (!currentCharacter) {
		return;
	}

	const handleSymbolChange = (index: number, { level, exp }: Partial<SymbolData>) => {
		const newSymbols = [...currentCharacter.symbols[type]];

		if (level !== undefined) {
			newSymbols[index].level = level;
		} else {
			({ level } = currentCharacter.symbols[type][index]);
		}
		if (exp !== undefined) {
			let expToNextLevel = symbolInfo[type].cost.symbols[level];
			if (exp >= expToNextLevel) {
				while (exp >= expToNextLevel) {
					level += 1;
					exp -= expToNextLevel;
					expToNextLevel = symbolInfo[type].cost.symbols[level];
				}

				newSymbols[index].level = level;
				if (level === maxLevels[type]) {
					exp = 0;
				}
			}

			newSymbols[index].exp = exp;
		}

		updateCharacter(currentCharacter.id, {
			symbols: {
				...currentCharacter.symbols,
				[type]: newSymbols,
			},
		});
	};

	return (
		<section className={styles.symbolManager}>
			{symbols.map((symbol, index) => {
				const info = symbolInfo[type];
				const regionName = symbol.name.split(": ")[1];

				if (currentCharacter.level < info.reqLevel[regionName]) {
					return;
				}

				const { level, exp } = currentCharacter.symbols[type][index];

				return (
					<div>
						<h3>{regionName}</h3>
						<Image
							src={`/images/assets/${symbol.id}.png`}
							alt={symbol.name}
							title={symbol.description}
							width={38}
							height={38}
						/>

						<div>
							<span>Level</span>
							<Input
								type="number"
								value={level}
								min={1}
								max={maxLevels[type]}
								onChange={e => {
									const newLevel = Number(e.target.value);

									const safeReduceLevel = newLevel < level && exp < symbolInfo[type].cost.symbols[newLevel];

									handleSymbolChange(index, {
										level: newLevel,
										exp: safeReduceLevel ? (newLevel > 1 ? exp : 1) : 0,
									});
								}}
								style={{
									width: `${String(level).split("").length}ch`,
								}}
							/>
						</div>

						<div>
							<span>Progress:</span>
							{!info.cost.symbols[level] ? (
								<span>Max</span>
							) : (
								<div>
									<Input
										type="number"
										value={exp}
										min={0}
										onChange={e => {
											let exp = Number(e.target.value);
											if (exp === 0 && level === 1) {
												exp = 1;
											}

											e.target.value = String(exp);

											handleSymbolChange(index, {
												exp,
											});
										}}
										style={{
											width: `${String(exp).split("").length}ch`,
										}}
									/>
									<span>/{info.cost.symbols[level]}</span>
								</div>
							)}
						</div>
					</div>
				);
			})}
		</section>
	);
}