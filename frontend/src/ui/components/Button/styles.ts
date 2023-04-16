"use client";
import styled from "styled-components";

interface Props {
	colors: [string, string];
}

export const Styling = styled.button<Props>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    color: #fff;
    background: ${({ colors }) => `linear-gradient(${colors[0]}, ${colors[1]})`};

    border-width: 1px;
    border-style: solid;

    span {
        font-size: 0.55em;
        text-shadow: 0 0 4px #000;
        text-transform: uppercase;

        margin: 0 auto;
    }

    > svg {
        height: 30%;
        margin-right: 2px;
    }

    &:active {
        background: ${({ colors }) => `linear-gradient(${colors[1]}, ${colors[0]})`};
    }
`;
