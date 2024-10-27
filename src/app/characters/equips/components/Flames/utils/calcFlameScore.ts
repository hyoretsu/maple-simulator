import type { FlameStats, PlayableClass, Stat } from "maple-simulator";

export function calcFlameScore(
	flames: FlameStats,
	{ branch, mainStat, name: job, secondaryStat }: PlayableClass,
) {
	return Object.entries(flames).reduce((total, [stat, value]) => {
		if (stat === "allStats") {
			if (job === "Xenon") {
				value *= 22;
			} else {
				value *= 9;
			}
		} else if (stat === "att" || stat === "mAtt") {
			if (branch === "Magician") {
				if (stat === "mAtt") {
					if (job === "Kanna") {
						value *= 2.5;
					} else {
						value *= 3;
					}
				} else {
					value = 0;
				}
			} else if (stat === "att") {
				value *= 3;
			} else {
				value = 0;
			}
		} else {
			stat = stat.toUpperCase();

			if (Array.isArray(mainStat) ? mainStat.includes(stat as Stat) : mainStat === stat) {
			} else if (
				Array.isArray(secondaryStat) ? secondaryStat.includes(stat as Stat) : secondaryStat === stat
			) {
				value /= 10;
			} else if ((job === "Kanna" && stat === "HP") || stat === "MP") {
				value /= 280;
			} else {
				value = 0;
			}
		}

		return total + value;
	}, 0);
}
