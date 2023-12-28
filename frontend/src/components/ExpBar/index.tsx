"use client";
import { Input } from "@hyoretsu/react-components";
import { useFetch } from "@hyoretsu/react-hooks";
import { range } from "@hyoretsu/utils";
import { useCharInfo, useExp, useFuncs } from "context/char";
import { useMemo } from "react";
import api from "services/api";
import styles from "./styles.module.scss";

export default function ExpBar() {
	const { level } = useCharInfo();
	const exp = useExp();
	const { updateInfo } = useFuncs();

	const { data } = useFetch("/exp", api);
	const expList = useMemo<number[]>(() => {
		if (!data) return [];

		return data.map(entry => entry.exp);
	}, [data]);

	const percentage = ((exp / expList[level - 1]) * 100).toFixed(2);

	return (
		<div className={styles.expBarDiv}>
			<span>EXP</span>

			<div className={styles.experience}>
				<i className={styles.progressBar} style={{ width: `${percentage}%` }} />

				{range(1, 10).map(number => (
					<div className={styles.marker} key={number} style={{ left: `${number * 10}%` }} />
				))}

				<div className={styles.expText}>
					<Input
						value={exp}
						max={expList[level - 1]}
						onChange={e => updateInfo("exp", e.target.value)}
						style={{ width: `${String(exp).length + 1}ch` }}
					/>
					<span>[{percentage}%]</span>
				</div>
			</div>
		</div>
	);
}
