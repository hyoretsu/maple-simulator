import CloseButton from '@assets/CloseButton.svg';

import { Frame } from './styles';

interface WindowProps {
    children: React.ReactNode;
    size: [number, number];
    title: string;
}

const Window: React.FC<WindowProps> = ({ children, size, title }) => {
    return (
        <Frame style={{ height: size[1], width: size[0] }}>
            <span>{title}</span>
            <CloseButton />
            {children}
        </Frame>
    );
};

export default Window;
