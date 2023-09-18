import styled from "styled-components";

export const Background = styled.div`
	display: grid;
	grid-template-rows: 6fr 4fr 1fr;

	width: 95%;
	height: 96%;
	background-color: #fff;

	border-radius: 5px;
	margin: auto 0;
`;

export const Title = styled.div`
    display: flex;
    align-items: center;

    width: 100%;
    background-color: #38a;

    padding: 5px 8px;
    margin-bottom: 1px;
    border: 1px solid #777;
    border-radius: 4px;

    div {
        width: 4px;
        height: 4px;
        background-color: #0bd;

        border: 1px solid #fff;
        border-radius: 50vw;
    }

    p {
        color: #fff;
        font-size: 0.7em;
        text-transform: uppercase;

        margin-left: 4px;
    }

`;

export const Info = styled.div`
    display: flex;
    align-items: center;

	background: linear-gradient(#ccc, #888);

    margin-top: 2px;
    border: 1px solid #777;
    border-radius: 3px;

    > span:first-of-type {
        color: #fff;
		font-size: 0.5em;
        text-transform: uppercase;
        width: 68px;
        text-shadow: 1px 1px 4px #000;

        margin-left: 3px;
        border-radius: 3px 0 0 3px;
    }

	span + div,
    > span + span {
        flex: 1;

        height: 100%;
        background-color: #fff;
        font-size: 0.7rem;

        padding-left: 3px;
        border-left: 1px solid #777;
        border-radius: 0 3px 3px 0;
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;

        span {
            font-size: 0.7rem;
            padding-left: 8%;
        }

        span + span {
			border-top: 2px dotted;
        }
    }
`;

export const Line = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2px;
`;

export const InnerAbilityTitle = styled.div``;

export const InnerAbilityDiv = styled.div``;