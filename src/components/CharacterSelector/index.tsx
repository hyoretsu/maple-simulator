"use client";
import { useCharacters } from "@context/account";
import styles from "./styles.module.scss";

export interface CharacterSelectorProps {
	allowCreation?: boolean;
	name?: string;
}

export default function CharacterSelector({
	allowCreation = false,
	name = "character-selector",
}: CharacterSelectorProps) {
	const { characters, createCharacter, currentCharacter, setCurrentCharacterIndex } = useCharacters();

	return (
		<select
			name={name}
			id="character-selector"
			className={styles.characterSelector}
			value={currentCharacter?.id}
			onChange={e => {
				if (e.currentTarget.value === "create") {
					try {
						createCharacter();
						setCurrentCharacterIndex(-1);
					} catch (e) {
						console.error(e);
					}
				} else {
					setCurrentCharacterIndex(characters.findIndex(({ id }) => id === e.currentTarget.value));
				}
			}}
		>
			<option value="" hidden />
			{characters.map(({ id, nickname }) => (
				<option key={id} value={id}>
					{nickname}
				</option>
			))}
			{allowCreation && <option value="create">Create</option>}
		</select>
	);
}
