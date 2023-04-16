import { HTMLAttributes } from "react";

import CloseButton from "@assets/CloseButton.svg";

import { Frame } from "./styles";

interface WindowProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	onClose?: () => void;
	size: [number, number];
	title: string;
}

const Window: React.FC<WindowProps> = ({ children, onClose, size, title, style, ...rest }) => {
	return (
		<Frame style={{ ...style, height: size[1], width: size[0] }} {...rest}>
			{title && <span>{title}</span>}
			<CloseButton onClick={onClose} />
			{children}
		</Frame>
	);
};

export default Window;
