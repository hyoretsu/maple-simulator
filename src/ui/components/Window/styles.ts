import styled from 'styled-components';

export const Frame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    background: #444;

    margin: auto 0;
    border: 1px solid #c8c8c8;
    border-radius: 10px;

    > span {
        color: #d7b424;
        font-size: 0.6em;
        text-shadow: 0 0 4px #000;
        text-transform: uppercase;

        margin: 2%;
    }

    > svg {
        position: absolute;
        top: 2%;
        right: 4%;

        width: max(3%, 8px);
        color: #fff;
        filter: drop-shadow(0 1px 2px #000);

        &:hover:not(:active) {
            filter: drop-shadow(0 0 2px #d2d4b8);
        }

        &:active {
            color: #b9b9b9;
        }
    }
`;
