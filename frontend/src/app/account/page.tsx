"use client";
import { useAccount, useCharacters } from "@context/account";
import { Input } from "@hyoretsu/react-components";
import { useState } from "react";
import CharacterEdit from "./components/CharacterEdit";
import styles from "./styles.module.scss";

export default function Account() {
	const { account, updateAccount } = useAccount();
	const { createCharacter, currentCharacter, setCurrentCharacterIndex } = useCharacters();

	const [error, setError] = useState("");

	return (
		<>
			<main className={styles.form}>
				<fieldset>
					<label htmlFor="account-id">Account ID</label>
					<Input
						name="account-id"
						value={account.id}
						onChange={e => updateAccount({ id: e.target.value.toUpperCase() })}
					/>
				</fieldset>

				<fieldset>
					<label htmlFor="world">Characters</label>
					<select
						className={styles.characterSelector}
						value={currentCharacter?.id}
						onChange={e => {
							if (e.target.value === "create") {
								try {
									createCharacter();
									setCurrentCharacterIndex(-1);
								} catch (e) {
									if (e instanceof Error) {
										setError(e.message);
									}
								}
							} else {
								setCurrentCharacterIndex(account.characters.findIndex(({ id }) => id === e.target.value));
							}
						}}
					>
						<option value="" hidden />
						{account.characters.map(({ id, nickname }) => (
							<option key={id} value={id}>
								{nickname}
							</option>
						))}
						<option value="create">Create</option>
					</select>
				</fieldset>

				{currentCharacter && <CharacterEdit character={currentCharacter} />}
			</main>

			{error && <p style={{ margin: "0 auto" }}>Error: {error.toLowerCase()}</p>}
		</>
	);
}
