import { ReactNode } from "react";
import styles from "../styles.module.scss";

export interface InfoProps {
	children?: ReactNode;
	isBig?: boolean;
	stat?: boolean;
}

export function Info({ children, isBig, stat }: InfoProps) {
	return (
		<div
			className={styles.info}
			style={{
				...(isBig ? { "--labelPaddingTop": "5%" } : { height: "90%" }),
				...(stat && { position: "relative" }),
			}}
		>
			{children}
		</div>
	);
}
