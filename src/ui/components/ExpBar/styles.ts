import styled from 'styled-components';

interface ExperienceProps {
    progress: string;
}

export const ExpBarDiv = styled.div`
    display: flex;
    align-items: center;
    background-color: #444;
    color: #fff;
    width: 100%;

    * {
        height: 100%;
    }

    > span {
        margin: 0 2px;
        font-size: 0.6em;
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
        background-color: transparent;
        color: #fff;
        font-size: 0.6em;
        text-shadow: 0 0 4px #000;
    }
`;

export const ProgressBar = styled.i<ExperienceProps>`
    background: linear-gradient(#d4e20e, #ac0);
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ progress }) => progress}%;

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
    background-color: #a8a8a8;
    position: absolute;
    bottom: 0;
    width: 1px;
`;
