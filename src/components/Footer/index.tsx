import { CSSProperties, ReactNode } from "react";
import styles from "./styles.module.scss";

export interface FooterProps {
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
}

export default function Footer({ children, className, style }: FooterProps) {
	return (
		<footer className={`${styles.footer} ${className}`} style={style}>
			{children}
		</footer>
	);
}
