import LevelButtonSvg from "@assets/LevelButton.svg";
import styles from "./styles.module.scss";

export default function LevelButton({ ...props }: ButtonProps) {
	return (
		<button className={styles.button} type="button" {...props}>
			<LevelButtonSvg />
		</button>
	);
}
