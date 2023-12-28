import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	border: string;
	children: React.ReactNode;
	colors: [string, string];
	size: [number, number];
}

export default function Button({ border, children, colors, size, style }: ButtonProps) {
	const background = `linear-gradient(${colors[0]}, ${colors[1]})`;
	const activeBackground = `linear-gradient(${colors[1]}, ${colors[0]})`;

	return (
		<button
			type="button"
			className={styles.button}
			onMouseDown={e => e.currentTarget.style.setProperty("--background", activeBackground)}
			onMouseUp={e => e.currentTarget.style.setProperty("--background", background)}
			style={{
				"--background": background,
				borderColor: border,
				borderRadius: size[1] / 3,
				height: size[1],
				width: size[0],
				...style,
			}}
		>
			{children}
		</button>
	);
}
