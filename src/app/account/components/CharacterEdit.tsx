import { useCharacters } from "@context/account";
import classes from "@data/classes.json";
import worlds from "@data/worlds.json";
import { Input } from "@hyoretsu/react-components";
import { Character, World } from "maple-simulator";
import styles from "../styles.module.scss";

export interface CharacterEditProps {
	character: Character;
}

export default function CharacterEdit({
	character: { id, class: charClass, level, nickname, world },
}: CharacterEditProps) {
	const { updateCharacter } = useCharacters();

	return (
		<div key={id} className={styles.characterEdit}>
			<fieldset>
				<label htmlFor="nickname">Nickname</label>
				<Input
					name="nickname"
					value={nickname}
					onChange={e => updateCharacter(id, { nickname: e.currentTarget.value })}
				/>
			</fieldset>

			<fieldset>
				<label htmlFor="world">World</label>
				<select
					name="world"
					value={world}
					onChange={e => updateCharacter(id, { world: e.currentTarget.value as World })}
				>
					{worlds.map(worldName => (
						<option key={worldName} value={worldName}>
							{worldName}
						</option>
					))}
				</select>
			</fieldset>

			<fieldset>
				<label htmlFor="level">Level</label>
				<Input
					name="level"
					type="number"
					value={level}
					min={1}
					max={300}
					onChange={e => updateCharacter(id, { level: Number(e.currentTarget.value) })}
				/>
			</fieldset>

			<fieldset>
				<label htmlFor="class">Class</label>
				<select
					name="class"
					value={charClass}
					onChange={e => updateCharacter(id, { class: e.currentTarget.value as World })}
				>
					{classes.map(({ name }) => (
						<option key={name} value={name}>
							{name}
						</option>
					))}
				</select>
			</fieldset>
		</div>
	);
}
