"use client";
import styled from "styled-components";

interface InfoProps {
	isBig?: boolean;
	stat?: boolean;
}

export const Background = styled.div`
	display: grid;
	grid-template-rows: 6fr 2fr 3fr 1fr;

	width: 95%;
	height: 92%;
	background-color: #fff;

	border-radius: 5px;

	> div:first-of-type,
	section + div {
		display: grid;
		margin: 1% 0;
	}

	> div:first-of-type {
		grid-template-rows: repeat(4, 1fr) 2fr 1fr 1fr;
	}

	section + div {
		grid-template-rows: repeat(4, 1fr);
	}
`;

export const Info = styled.div<InfoProps>`
	display: flex;
	${({ stat }) => stat && "position: relative;"}

	width: 97%;
	${({ isBig }) => !isBig && "height: 90%;"}

	margin: auto;

	> label,
	> span {
		color: #fff;
		background: linear-gradient(#d7fc00, #88bf00);
		width: 31%;
		font-size: 0.6em;
		text-shadow: 0 0 4px #000;
		text-transform: uppercase;

		padding: ${({ isBig }) => (isBig ? "5%" : "0.8%")} 0 0 2%;
		border: 1px solid #89ab43;
		border-right-width: 2px;
		border-radius: 4px 0 0 4px;
	}

	input,
	select,
	> div {
		flex: 1;

		width: 100%;
		color: #a8a8a8;
		font-size: 0.7em;

		padding-left: 2%;
		border: 2px solid #a8a8a8;
		border-left: none;
		border-radius: 0 4px 4px 0;
	}

	select {
		padding: 0;
	}

	> div {
		padding: 0;

		span {
			display: block;
		}

		span:first-of-type {
			padding-left: 15%;
		}

		span:not(:first-of-type) {
			padding-left: 18%;
			border-top: 2px dotted;
		}
	}

	button {
		position: absolute;
		right: 2%;
		bottom: 19%;
	}
`;

export const AbilityPoint = styled.section`
	display: flex;
	justify-content: space-between;

	background: linear-gradient(#b8e1ff, #309ddd 50%);

	border: solid #a8a8a8;
	border-width: 2px 0;

	* {
		text-transform: uppercase;
	}

	div {
		display: flex;
		flex-direction: column;
		justify-content: center;

		font-size: 0.65em;

		margin-left: 6%;

		span:first-of-type {
			color: #fff;
			text-shadow: 0 0 4px #000;
		}

		span + span {
			align-self: flex-end;

			background-color: #fff;

			padding: 1% 3% 0 22%;
			margin-top: 6%;
		}
	}

	@keyframes button_idle {
		to {
			box-shadow: inset 0 0 8px 6px #e8eeca;
		}
	}

	button {
		position: relative;

		color: #e8e8e8;
		background: linear-gradient(#d7fc00, #88bf00);
		font-size: 0.55em;
		font-stretch: condensed;
		text-shadow: 0 0 4px #000;

		padding: 3% 4%;
		margin: 3% 4%;
		border-radius: 4px;

		&:not(:disabled) {
			&:before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;

				width: 97%;
				height: 94%;

				border: 1px solid #89ab43;
				border-radius: 4px;
			}
		}

		&:not(:hover, :disabled) {
			animation: button_idle 0.7s infinite;
		}

		&:active {
			background: linear-gradient(#88bf00, #d7fc00);
			animation: none;
		}

		&:disabled {
			background: linear-gradient(#ededed, #9d9d9d);
		}
	}
`;

export const Tabs = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	padding: 0 2%;
	border-top: 2px solid #a8a8a8;

	span {
		margin: 0 4px;
	}
`;