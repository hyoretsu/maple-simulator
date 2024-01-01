"use client";
import Check from "@assets/check.svg";
import { useCharacters } from "@context/account";
import bosses from "@data/bosses.json";
import { Input, Link } from "@hyoretsu/react-components";
import copyObject from "@utils/copyObject";
import { BossDifficulties, BossFrequency, BossRunInfo, Bosses } from "maple-simulator";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import styles from "../styles.module.scss";

interface CharacterSummary {
	income: number;
	timedIncome: number;
	time: [number, number, number];
	counted: number;
	notCounted: number;
}

interface Report {
	characters: {
		[id: string]: CharacterSummary;
	};
	crystals: number;
	income: number;
	time: [number, number, number];
	timedBosses: number;
	timedIncome: number;
	totalTime: number;
}

const difficultyColors = {
	Chaos: ["#444444", "#222222"],
	Easy: ["#999999", "#777777"],
	Extreme: ["#444444", "#222222"],
	Hard: ["#cc4477", "#aa3355"],
	Normal: ["#33aabb", "#228899"],
};

const maxAmount = 180;

const { format: formatNumber } = new Intl.NumberFormat();

type ParsedBosses = Array<
	[Bosses, Array<[BossDifficulties, { frequency: BossFrequency; price: number; requiredLevel: number }]>]
>;

export default function BossTable() {
	const { characters, currentCharacter, setCurrentCharacterIndex, updateCharacter } = useCharacters();

	const parsedBosses = useMemo<ParsedBosses>(() => {
		const preParsedBosses = Object.entries(bosses).map(([boss, difficulties]) => [
			boss,
			Object.entries(difficulties),
		]) as ParsedBosses;
		if (!currentCharacter) {
			return preParsedBosses;
		}

		return preParsedBosses.filter(
			([_, [[__, { requiredLevel }]]]) => requiredLevel <= currentCharacter!.level,
		);
	}, [currentCharacter]);

	const bossAvailability = useMemo<Record<string, boolean>>(() => {
		if (!currentCharacter) return {};

		return parsedBosses.reduce((availableObj, [boss, difficulties]) => {
			for (const [difficulty] of difficulties) {
				const difficultyBoss = `${difficulty} ${boss}`;

				Object.assign(availableObj, { [difficultyBoss]: true });

				if (!Object.keys(currentCharacter.bossingRoutine).find(routineBoss => routineBoss.match(boss))) {
					continue;
				}

				const sameBosses = Object.entries(availableObj).filter(([givenBoss]) => {
					const [givenDifficulty, givenBossName] = givenBoss.split(/(?<=^\S+)\s/g);

					return (
						givenBossName === boss &&
						// @ts-ignore
						bosses[givenBossName][givenDifficulty].frequency === bosses[boss][difficulty].frequency
					);
				});

				if (
					sameBosses.length < 2 ||
					!sameBosses.find(([givenBoss]) =>
						Object.keys(currentCharacter.bossingRoutine).find(routineBoss => routineBoss === givenBoss),
					)
				) {
					continue;
				}

				for (const [boss] of sameBosses) {
					Object.assign(availableObj, { [boss]: !!currentCharacter.bossingRoutine[boss] });
				}
			}

			return availableObj;
		}, {});
	}, [currentCharacter, parsedBosses]);

	const updateRoutine = (newBossData: Record<string, Record<string, number>>) => {
		const newBossDataEntries = Object.entries(newBossData);
		if (newBossDataEntries.length > 1) {
			throw new Error("You must update bossing routines one by one.");
		}

		const newRoutine = copyObject(currentCharacter!.bossingRoutine);
		const [difficultyBoss, newData] = newBossDataEntries[0];

		if (Object.entries(newData).length === 0) {
			delete newRoutine[difficultyBoss];
		} else {
			Object.assign(newRoutine, {
				[difficultyBoss]: {
					...newRoutine[difficultyBoss],
					...newData,
				},
			});
		}

		updateCharacter(currentCharacter!.id, {
			bossingRoutine: newRoutine,
		});
	};

	const report = useMemo<Report>(
		() =>
			characters.reduce(
				(incomeCrystals, { bossingRoutine, id, world }) => {
					const characterIncomeCrystals = Object.entries(bossingRoutine).reduce(
						(incomeCrystals2, [difficultyBoss, runInfo]) => {
							const [difficulty, boss] = difficultyBoss.split(/(?<=^\S+)\s/g) as [BossDifficulties, Bosses];

							// @ts-ignore
							const { frequency, price } = bosses[boss][difficulty];

							const frequencyMult = frequency === "daily" ? 7 : frequency === "monthly" ? 0.25 : 1;
							let rebootMult = 1;
							if (world === "Hyperion" || world === "Kronos" || world === "Solis") {
								rebootMult = 5;
							}

							const income = Math.floor((price * rebootMult) / runInfo!.partySize);

							Object.assign(incomeCrystals2, {
								crystals: incomeCrystals2.crystals + Math.ceil(frequencyMult),
								income: incomeCrystals2.income + Math.floor(income * frequencyMult),
							});
							if (runInfo!.timeTaken > 0) {
								const times = frequency === "daily" ? 7 : 1;

								Object.assign(incomeCrystals2, {
									timedBosses: incomeCrystals2.timedBosses + 1,
									timedIncome: incomeCrystals2.timedIncome + income * times,
									totalTime: incomeCrystals2.totalTime + runInfo!.timeTaken * times,
								});
							}

							return incomeCrystals2;
						},
						{ crystals: 0, income: 0, timedBosses: 0, timedIncome: 0, totalTime: 0 },
					);

					let time = characterIncomeCrystals.totalTime;
					const characterHours = Math.floor(time / 3600);
					time -= characterHours * 3600;
					const characterMinutes = Math.floor(time / 60);
					time -= characterMinutes * 60;
					const characterSeconds = time;

					let accountSeconds = incomeCrystals.time[2] + characterSeconds;
					let accountMinutes = incomeCrystals.time[1] + characterMinutes;
					let accountHours = incomeCrystals.time[0] + characterHours;

					if (accountSeconds >= 60) {
						accountSeconds -= 60;
						accountMinutes += 1;
					}
					if (accountMinutes >= 60) {
						accountMinutes -= 60;
						accountHours += 1;
					}

					Object.assign(incomeCrystals, {
						...(characterIncomeCrystals.income && {
							characters: {
								...incomeCrystals.characters,
								[id]: {
									income: characterIncomeCrystals.income,
									timedIncome: characterIncomeCrystals.timedIncome,
									time: [characterHours, characterMinutes, characterSeconds],
									counted: characterIncomeCrystals.timedBosses,
									notCounted: characterIncomeCrystals.crystals - characterIncomeCrystals.timedBosses,
								},
							},
						}),
						crystals: incomeCrystals.crystals + characterIncomeCrystals.crystals,
						income: incomeCrystals.income + characterIncomeCrystals.income,
						time: [accountHours, accountMinutes, accountSeconds],
						timedBosses: incomeCrystals.timedBosses + characterIncomeCrystals.timedBosses,
						timedIncome: incomeCrystals.timedIncome + characterIncomeCrystals.timedIncome,
						totalTime: incomeCrystals.totalTime + characterIncomeCrystals.totalTime,
					});

					return incomeCrystals;
				},
				{
					characters: {},
					crystals: 0,
					income: 0,
					time: [0, 0, 0],
					timedBosses: 0,
					timedIncome: 0,
					totalTime: 0,
				},
			),
		[characters],
	);
	const characterReport = useMemo(() => {
		if (!currentCharacter) {
			return undefined;
		}

		return report.characters[currentCharacter.id];
	}, [currentCharacter, report]);

	const toggleBossClear = useCallback(
		(boss: Bosses, difficulty: BossDifficulties, runInfo?: Partial<BossRunInfo>) => {
			const difficultyBoss = `${difficulty} ${boss}`;

			if (
				!bossAvailability[difficultyBoss] ||
				(!currentCharacter!.bossingRoutine[difficultyBoss] &&
					report.crystals +
						// @ts-ignore
						(bosses[boss][difficulty].frequency === "daily" ? 7 : 1) >
						maxAmount)
			) {
				return;
			}

			updateRoutine({
				[difficultyBoss]: currentCharacter!.bossingRoutine[difficultyBoss]
					? {}
					: {
							partySize: 1,
							timeTaken: 0,
							...runInfo,
					  },
			});
		},
		[bossAvailability, currentCharacter, report, updateRoutine],
	);

	return (
		<>
			{!currentCharacter ? (
				<Link href="/account">
					It seems like you don't have any characters created yet. Please go to the Account page (or click
					here) and create at least one.
				</Link>
			) : (
				<>
					<select
						className={styles.characterSelector}
						value={currentCharacter.nickname}
						onChange={e => {
							setCurrentCharacterIndex(
								characters.findIndex(character => character.nickname === e.target.value),
							);
						}}
					>
						{characters.map(({ nickname }) => (
							<option key={nickname} value={nickname}>
								{nickname}
							</option>
						))}
					</select>
					{!!characterReport && (
						<p>
							{formatNumber(characterReport.income)} (
							{((characterReport.income / report.income) * 100).toFixed(2)}%) mesos
							{characterReport.time.find(time => time > 0)
								? characterReport.time.reduce((str, time, index) => {
										const units = ["h", "m", "s"];

										if (time > 0) {
											str += `${time}${units[index]}`;
										}

										return str;
								  }, " in ")
								: ""}
							<br />(
							{`${
								characterReport.timedIncome
									? `${new Intl.NumberFormat([], {
											notation: "compact",
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
									  })
											.format(
												Number(
													Math.round(
														(characterReport.timedIncome /
															((characterReport.time[0] * 60 + characterReport.time[1]) * 60 +
																characterReport.time[2])) *
															7200,
													),
												),
											)
											.toLowerCase()} in a WAP`
									: ""
							}${
								characterReport.counted
									? characterReport.notCounted
										? `, ${characterReport.notCounted}/${
												characterReport.notCounted + characterReport.counted
										  } bosses not counted`
										: ""
									: `${characterReport.timedIncome ? ", " : ""}${characterReport.notCounted} bosses total`
							}`}
							)
						</p>
					)}

					<div className={styles.bossTable}>
						{parsedBosses.map(([boss, difficulties]) => (
							<section key={boss}>
								<div className={styles.bossIcon}>
									<Image src={`/images/bosses/icons/${boss}.png`} alt="" width={48} height={56} />
									<p>{boss}</p>
								</div>

								<div className={styles.bossDifficulties}>
									{Object.entries(
										difficulties.reduce((obj, [difficulty, { frequency }]) => {
											if (!obj[frequency]) {
												Object.assign(obj, { [frequency]: [] });
											}
											obj[frequency].push(difficulty);

											return obj;
										}, {} as Record<BossFrequency, BossDifficulties[]>),
									).map(([frequency, difficultyArr]) => (
										<div>
											<span>{frequency.slice(0, 1).toUpperCase() + frequency.slice(1)}</span>

											<div>
												{difficultyArr.map(difficulty => {
													const difficultyBoss = `${difficulty} ${boss}`;

													const backgroundColors = difficultyColors[difficulty];
													const background = `linear-gradient(to bottom, ${backgroundColors[0]}, ${backgroundColors[1]})`;

													let border = "";
													let color = "";

													if (difficulty === "Chaos") {
														border = "2px solid #ddbb88";
														color = "#ddccaa";
													} else if (difficulty === "Extreme") {
														border = "2px solid #ee3355";
														color = "#ee4444";
													}

													const runInfo = currentCharacter.bossingRoutine[difficultyBoss];
													console.log(currentCharacter.bossingRoutine);

													return (
														<div key={difficulty} className={styles.bossDificulty}>
															<button
																type="button"
																onClick={() => toggleBossClear(boss, difficulty)}
																style={{
																	"--background": background,
																	color,
																	...(border
																		? { border }
																		: {
																				padding: "calc(0.25rem + 2px) 2px",
																		  }),
																}}
															>
																{difficulty}

																{!!runInfo?.partySize && <Check />}
															</button>

															<div>
																<div>
																	<label htmlFor="party-size">Party</label>

																	<Input
																		name="party-size"
																		type="number"
																		value={runInfo?.partySize || ""}
																		placeholder="0"
																		min={0}
																		max={6}
																		onChange={e => {
																			const updatedInfo = {
																				partySize: Number(e.currentTarget.value),
																			};

																			if (!runInfo || updatedInfo.partySize === 0) {
																				toggleBossClear(boss, difficulty, updatedInfo);
																			} else {
																				updateRoutine({
																					[difficultyBoss]: updatedInfo,
																				});
																			}
																		}}
																	/>
																</div>

																<div>
																	<label htmlFor="time">Time</label>

																	<Input
																		name="time"
																		value={runInfo?.timeTaken || ""}
																		placeholder="0"
																		onChange={e => {
																			// Remove banned characters
																			e.currentTarget.value = e.currentTarget.value.replace(/[^\dms]/g, "");

																			const [time, unit] = e.currentTarget.value.split(/(m|s)/g);
																			const updatedInfo = {
																				timeTaken: Number(time) * (unit === "m" ? 60 : 1),
																			};

																			if (!runInfo) {
																				toggleBossClear(boss, difficulty, updatedInfo);
																			} else {
																				updateRoutine({
																					[difficultyBoss]: updatedInfo,
																				});
																			}
																		}}
																	/>
																</div>
															</div>
														</div>
													);
												})}
											</div>
										</div>
									))}
								</div>
							</section>
						))}
					</div>
					<p>
						Note: <b>Party</b> is the number of party members in your run and <b>Time</b> is the time taken to
						complete (shows seconds but you may write "m" for minutes and add the remaining seconds). Monthly
						bosses take up 1 crystal limit but only count 1/4th of their value.
					</p>

					<div className={styles.report}>
						<p>
							Total: {formatNumber(report.income)} mesos/week ({report.crystals} crystals)
						</p>
						<p>
							You are making a total of {formatNumber(report.timedIncome)} mesos in{" "}
							{Math.round(report.time[0])}h
							{Math.round(report.time[1])}m
							{Math.round(report.time[2])}s among {report.timedBosses}{" "}
							{report.timedBosses > 1 ? "bosses" : "boss"}.
							<br />
							For comparison, that's equal to{" "}
							{formatNumber(Math.floor((report.timedIncome / (report.totalTime || 1)) * 7200))} mesos in 2
							hours.
							<br />
							(a.k.a. WAP time, which usually yields an average of 1~1.2b)
						</p>
					</div>
				</>
			)}
		</>
	);
}
