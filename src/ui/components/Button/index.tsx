import { ButtonHTMLAttributes } from 'react';

import { Styling } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    border: string;
    children: React.ReactNode;
    colors: [string, string];
    size: [number, number];
}

const Button: React.FC<ButtonProps> = ({ border, children, colors, size, style }) => {
    return (
        <Styling
            colors={colors}
            style={{
                ...style,
                borderColor: border,
                borderRadius: size[1] / 3,
                height: size[1],
                width: size[0],
            }}
        >
            {children}
        </Styling>
    );
};

export default Button;
