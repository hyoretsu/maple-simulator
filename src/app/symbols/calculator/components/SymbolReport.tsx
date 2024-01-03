import { useCharacters } from "@context/account";
import symbolInfo from "@data/symbols.json";
import { Equipment, SymbolType } from "maple-simulator";
import { cloneElement, useMemo } from "react";
import styles from "../styles.module.scss";

interface SymbolReportProps {
	symbols: Equipment[];
	type?: SymbolType;
}

const { format: formatNumber } = new Intl.NumberFormat();

const dailies: Record<string, number> = {
	"Vanishing Journey": 10,
	"Chu Chu Island": 10,
	Lachelein: 20,
	Arcana: 20,
	Morass: 20,
	Esfera: 20,
	Cernium: 20,
	"Hotel Arcus": 10,
	Odium: 10,
	"Shangri-La": 10,
	Arteria: 10,
	Carcion: 10,
};

const weeklies: Record<string, number | undefined> = {
	"Vanishing Journey": 45,
	"Chu Chu Island": 45,
	Lachelein: 45,
	Arcana: 45,
	Morass: 45,
	Esfera: 45,
	Cernium: undefined,
	"Hotel Arcus": undefined,
	Odium: undefined,
	"Shangri-La": undefined,
	Arteria: undefined,
	Carcion: undefined,
};

export default function SymbolReport({ symbols, type = "" as SymbolType }: SymbolReportProps) {
	const { currentCharacter } = useCharacters();
	if (!currentCharacter) {
		return;
	}

	const { mesos: mesoCost, symbols: symbolCost } = useMemo(() => symbolInfo[type].cost, [type]);

	return (
		<section className={styles.symbolReport}>
			{symbols.reduce(
				(element, { id, name }, index) => {
					const {
						props: { children: [symbolDiv, timeDiv, expDiv, costDiv] },
					} = element;
					const regionName = name.split(": ")[1];
					if (currentCharacter.level < symbolInfo[type].reqLevel[regionName]) {
						return element;
					}

					const currentSymbol = currentCharacter.symbols[type][index];

					const symbolCostEntries = Object.entries(symbolCost);
					const nextLevelIndex = symbolCostEntries.findIndex(
						([level]) => Number(level) === currentSymbol.level,
					);

					let cost: number | undefined;
					let exp: number | undefined;
					let days = 0;

					if (nextLevelIndex !== -1) {
						cost = Object.entries(mesoCost[regionName])
							.slice(nextLevelIndex)
							.reduce((sum, [_, price]) => sum + price, 0);
						exp =
							symbolCostEntries.slice(nextLevelIndex).reduce((sum, [_, exp]) => sum + exp, 0) -
							currentSymbol.exp;

						let remainingExp = exp;
						let dailyGains = dailies[regionName];
						const weeklyGains = weeklies[regionName] || 0;
						if (regionName === "Vanishing Journey" && currentCharacter.level >= 205) {
							dailyGains += 10;
						}
						if (regionName === "Chu Chu Island" && currentCharacter.level >= 215) {
							dailyGains += 10;
						}
						const currentDate = new Date();
						const incrementDate = (date: Date) => {
							date.setUTCDate(date.getUTCDate() + 1);
						};
						incrementDate(currentDate);

						while (true) {
							remainingExp -= dailyGains;
							// Sunday - weekly reset
							if (currentDate.getUTCDay() === 1) {
								remainingExp -= weeklyGains;
							}

							days += 1;
							incrementDate(currentDate);

							if (remainingExp <= 0) {
								break;
							}
						}
					}

					return (
						<>
							{cloneElement(symbolDiv, {
								children: [
									...(Array.isArray(symbolDiv.props.children)
										? symbolDiv.props.children
										: [symbolDiv.props.children]),
									<span key={id}>{name.split(": ")[1]}</span>,
								],
							})}
							{cloneElement(timeDiv, {
								children: [
									...(Array.isArray(timeDiv.props.children)
										? timeDiv.props.children
										: [timeDiv.props.children]),
									<span key={id}>{days ? `${days}` : "-"}</span>,
								],
							})}
							{cloneElement(expDiv, {
								children: [
									...(Array.isArray(expDiv.props.children) ? expDiv.props.children : [expDiv.props.children]),
									<span key={id}>{exp ? formatNumber(exp) : "-"}</span>,
								],
							})}
							{cloneElement(costDiv, {
								children: [
									...(Array.isArray(costDiv.props.children)
										? costDiv.props.children
										: [costDiv.props.children]),
									<span key={id}>{cost ? formatNumber(cost) : "-"}</span>,
								],
							})}
						</>
					);
				},
				<>
					<div>
						<span key="title">Area</span>
					</div>
					<div>
						<span key="time">Time to max</span>
					</div>
					<div>
						<span key="exp">Remaining EXP</span>
					</div>
					<div>
						<span key="cost">Cost</span>
					</div>
				</>,
			)}
		</section>
	);
}
