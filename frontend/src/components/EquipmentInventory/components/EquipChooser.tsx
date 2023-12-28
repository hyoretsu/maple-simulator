import Window from "components/Window";
import { ReactNode } from "react";
import styles from "../styles.module.scss";

export interface EquipChooserProps {
	children: ReactNode;
	onClose?: () => void;
}

export function EquipChooser({ children, onClose }: EquipChooserProps) {
	return (
		<Window className={styles.equipChooser} title="" size={[400, 300]} onClose={onClose}>
			{children}
		</Window>
	);
}
