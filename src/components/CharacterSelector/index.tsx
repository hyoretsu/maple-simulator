"use client";
import { useCharacters } from "@context/account";

export default function CharacterSelector() {
	const { characters, currentCharacter, setCurrentCharacterIndex } = useCharacters();
	if (!currentCharacter) {
		return;
	}

	return (
		<select
			value={currentCharacter.nickname}
			onChange={e => {
				setCurrentCharacterIndex(
					characters.findIndex(character => character.nickname === e.currentTarget.value),
				);
			}}
		>
			{characters.map(({ nickname }) => (
				<option key={nickname} value={nickname}>
					{nickname}
				</option>
			))}
		</select>
	);
}
