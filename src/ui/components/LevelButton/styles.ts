import styled from 'styled-components';

export const Button = styled.button`
    width: 11px;
    height: 10px;
    background: linear-gradient(#ff0, #ce771e 90%);

    padding: 5px;
    border-radius: 2px;

    &:not(:disabled) {
        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;

            width: 82%;
            height: 80%;

            border: 1px solid #ce771e;
            border-radius: 2px;
        }
    }

    svg {
        position: absolute;
        right: 11%;
        bottom: 22%;

        width: 7px;
        color: #fff;
    }

    &:active {
        background: linear-gradient(#ce771e, #ff0 90%);
    }

    &:disabled {
        color: #ddd;
        background: linear-gradient(#d0d0d0, #969696);
    }
`;
