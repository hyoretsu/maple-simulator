"use client";
import styled from "styled-components";

import Window from "@components/Window";

interface BackgroundProps {
	job: string;
}

interface TabProps {
	active?: boolean;
}

interface SlotProps {
	background?: string;
}

// @ts-ignore
export const EquipChooser = styled(Window).attrs({
	title: "",
	size: [400, 300],
})`
    display: flex;
    align-items: center;
    position: absolute;
    top: 32px;
    z-index: 1;
`;

export const ScrollDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(9, 1fr);

    overflow: auto;

    padding-bottom: 4px;
    margin-top: 20px;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const EquipChooserSlot = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40px;
    height: 40px;
`;

export const Background = styled.div<BackgroundProps>`
    display: grid;
    grid-template-rows: 1fr 15fr 2fr;

    width: 95%;
    height: 93%;
    background-color: #fff;

    border-radius: 5px;
`;

export const TopBar = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    padding: 0 2px;
    border-bottom: 2px solid #f07e00;
`;

export const Tab = styled.button<TabProps>`
    display: flex;
    align-items: flex-end;
    justify-content: center;

    height: ${({ active }) => (active ? 19 : 17)}px;
    color: #fff;
    background-color: ${({ active }) => (active ? "#FFAF0E" : "#999")};
    font-size: 0.6em;
    font-stretch: condensed;
    text-transform: uppercase;

    padding-bottom: 1px;
    margin-top: ${({ active }) => (active ? "4px" : "auto")};
    border-width: 2px 2px 0;
    border-style: solid;
    border-color: ${({ active }) => (active ? "#e7884d" : "#858585")};
    border-radius: 4px 4px 0 0;

    & + & {
        margin-left: 1px;
    }
`;

export const EquipSlots = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    background: url('/images/Equip/background.png') #ddd center no-repeat;
    cursor: pointer;

    padding: 2%;
    margin: 2px;
    border-radius: 5px;

    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export const Slot = styled.div<SlotProps>`
    display: flex;
    position: relative;

    width: 40px;
    height: 40px;
    background-color: ${({ background }) => background || "transparent"};

    padding: 5%;
    border-radius: 4px;

    span {
        color: #ccc;
        font-size: 0.46em;
        text-transform: uppercase;

        &:not(:last-of-type) {
            align-self: flex-start;
            position: absolute;
        }

        & + br + span {
            top: 10px;
        }
    }

    > span:last-of-type {
        margin: auto !important;
    }

    & + & {
        margin-top: 5%;
    }
`;

export const BottomSection = styled.div`
    display: grid;
    grid-template-rows: 0.5fr 1fr;

    padding: 4px 2px;
    border-top: 2px solid #a8a8a8;
`;

export const ExtraButtons = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const MiscButtons = styled.div`
    display: flex;
`;
