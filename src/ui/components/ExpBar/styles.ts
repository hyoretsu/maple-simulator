import styled from 'styled-components';

interface ExperienceProps {
    progress: string;
}

export const ExpBarDiv = styled.div`
    display: flex;
    align-items: center;
    background-color: #444;
    color: #fff;
    font-size: 0.6em;
    width: 100%;

    * {
        height: 100%;
    }

    > span {
        margin: 0 2px;
    }
`;

export const Experience = styled.div`
    display: flex;
    position: relative;
    flex: 1;

    span {
        display: block;
        text-shadow: 0 0 4px #000;
        margin: 0 auto;
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
