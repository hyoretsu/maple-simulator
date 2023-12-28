import { CSSProperties } from "react";
import styles from "../styles.module.scss";

export interface TabProps {
	active?: boolean;
	children: string;
}

export function Tab({ active = false, children }: TabProps) {
	const dynamicStyles: Record<string, Record<string, CSSProperties>> = {
		active: {
			false: {
				backgroundColor: "#999999",
				borderColor: "#858585",
				height: 17,
				marginTop: "auto",
			},
			true: {
				backgroundColor: "#ffaf0e",
				borderColor: "#e7884d",
				height: 19,
				marginTop: 4,
			},
		},
	};

	return (
		<button className={styles.tab} type="button" style={dynamicStyles.active[active.toString()]}>
			{children}
		</button>
	);
}
