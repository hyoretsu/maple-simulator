import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import styles from "../styles.module.scss";

export interface SlotProps {
	background?: string;
	children?: ReactNode;
	onClick?: MouseEventHandler<HTMLDivElement>;
	style?: CSSProperties;
}

export function Slot({ background = "", children, onClick, style }: SlotProps) {
	return (
		<div className={styles.slot} onClick={onClick} style={{ "--background": background, ...style }}>
			{children}
		</div>
	);
}
