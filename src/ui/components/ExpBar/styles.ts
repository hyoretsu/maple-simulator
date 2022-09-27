import styled from 'styled-components';

interface ExperienceProps {
    progress: string;
}

export const ExpBarDiv = styled.div`
    display: flex;
    align-items: center;
    z-index: -2;

    width: 100%;
    color: #fff;
    background-color: #444;

    * {
        height: 100%;
    }

    > span {
        font-size: 0.6em;

        margin: 0 2px;
    }
`;

export const Experience = styled.div`
    position: relative;
    flex: 1;
`;

export const ExpText = styled.div`
    display: flex;
    justify-content: center;

    margin: auto;

    input,
    span {
        width: auto;
        color: #fff;
        background-color: transparent;
        font-size: 0.6em;
        text-shadow: 0 0 4px #000;
    }
`;

export const ProgressBar = styled.i<ExperienceProps>`
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;

    width: ${({ progress }) => progress}%;
    background: linear-gradient(#d4e20e, #ac0);

    &:after {
        content: '';
        position: absolute;
        right: -1px;

        width: 3px;
        height: 100%;
        background-color: #fafec5;
        filter: blur(1px);
    }
`;

export const Marker = styled.div`
    position: absolute;
    bottom: 0;

    width: 1px;
    background-color: #a8a8a8;
`;
