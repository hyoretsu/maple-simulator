import CloseButton from "@assets/CloseButton.svg";
import { HTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface WindowProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	closeButton?: boolean;
	onClose?: () => void;
	size: [number, number];
	title?: string;
}

export default function Window({
	children,
	className,
	closeButton = true,
	onClose,
	size,
	title,
	style,
	...rest
}: WindowProps) {
	return (
		<div
			className={`${styles.frame} ${className}`}
			style={{ ...style, height: size[1], width: size[0] }}
			{...rest}
		>
			{title && <span>{title}</span>}
			{closeButton && <CloseButton onClick={onClose} />}
			{children}
		</div>
	);
}
