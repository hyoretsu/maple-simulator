"use client";
import { useCharacters } from "@context/account";
import { SymbolType } from "maple-simulator";
import { CSSProperties, Dispatch, SetStateAction } from "react";
import styles from "../styles.module.scss";

const selectedTypeStyles: CSSProperties = {
	backgroundColor: "#dddddd",
	color: "#000000",
};

interface SymbolSelectorProps {
	state: [SymbolType, Dispatch<SetStateAction<SymbolType>>];
}

export default function SymbolSelector({ state: [symbolType, setSymbolType] }: SymbolSelectorProps) {
	const { currentCharacter } = useCharacters();
	if (!currentCharacter) {
		return;
	}

	return (
		<div
			className={styles.symbolSelector}
			style={{
				display: currentCharacter.level < 260 ? "none" : "block",
			}}
		>
			<button
				type="button"
				onClick={() => setSymbolType("Arcane")}
				style={{
					...(symbolType === "Arcane" && selectedTypeStyles),
				}}
			>
				Arcane River
			</button>
			<button
				type="button"
				onClick={() => setSymbolType("Sacred")}
				style={{
					...(symbolType === "Sacred" && selectedTypeStyles),
				}}
			>
				Grandis
			</button>
		</div>
	);
}
