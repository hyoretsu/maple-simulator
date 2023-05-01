"use client";
import styled from "styled-components";

export const Styling = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

export const StatsDiv = styled.div`
	display: flex;
	align-items: start;

	> div {
		margin: 0;
	}
`;

export const BottomBar = styled.footer`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	bottom: 0;
	width: 100%;
`;
