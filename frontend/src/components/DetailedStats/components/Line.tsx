import { PropsWithChildren } from "react";
import styles from "../styles.module.scss";

export function Line({ children }: PropsWithChildren) {
	return <section className={styles.line}>{children}</section>;
}
