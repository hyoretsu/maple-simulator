import { ReactNode } from "react";
import styles from "../styles.module.scss";

export interface BackgroundProps {
	children: ReactNode;
	job: string;
}

export function Background({ children }: BackgroundProps) {
	return <div className={styles.background}>{children}</div>;
}
