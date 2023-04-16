import LevelButtonSvg from "@assets/LevelButton.svg";

import { Button } from "./styles";

const LevelButton: React.FC<ButtonProps> = ({ ...props }) => {
	return (
		<Button type="button" {...props}>
			<LevelButtonSvg />
		</Button>
	);
};

export default LevelButton;
