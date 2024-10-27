import { Modal, type ModalProps } from "@hyoretsu/react-components";
import styles from "./styles.module.scss";

export default function StyledModal({ children, ...props }: ModalProps) {
	return (
		<Modal className={styles.modal} {...props}>
			{children}
		</Modal>
	);
}
