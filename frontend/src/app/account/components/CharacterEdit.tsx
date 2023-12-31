import { useCharacters } from "@context/account";
import worlds from "@data/worlds.json";
import { Input } from "@hyoretsu/react-components";
import { Character, World } from "maple-simulator";
import styles from "../styles.module.scss";

export interface CharacterEditProps {
	character: Character;
}

export default function CharacterEdit({ character: { id, nickname, world } }: CharacterEditProps) {
	const { updateCharacter } = useCharacters();

	return (
		<div key={id} className={styles.characterEdit}>
			<fieldset>
				<label htmlFor="nickname">Nickname</label>
				<Input
					name="nickname"
					value={nickname}
					onChange={e => updateCharacter(id, { nickname: e.target.value })}
				/>
			</fieldset>

			<fieldset>
				<label htmlFor="world">World</label>
				<select
					name="world"
					value={world}
					onChange={e => updateCharacter(id, { world: e.target.value as World })}
				>
					{worlds.map(worldName => (
						<option key={worldName} value={worldName}>
							{worldName}
						</option>
					))}
				</select>
			</fieldset>
		</div>
	);
}
