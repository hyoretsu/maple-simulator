import { PropsWithChildren } from "react";
import styles from "../styles.module.scss";

export function Info({ children }: PropsWithChildren) {
	return <div className={styles.info}>{children}</div>;
}
