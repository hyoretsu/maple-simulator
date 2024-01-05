"use client";
import Footer from "@components/Footer";
import { useAccount, useCharacters } from "@context/account";
import { Input, Modal } from "@hyoretsu/react-components";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiSolidCopy } from "react-icons/bi";
import { BsClipboard2Fill } from "react-icons/bs";
import { IoArrowBackOutline } from "react-icons/io5";
import CharacterEdit from "./components/CharacterEdit";
import styles from "./styles.module.scss";

export default function Account() {
	const { account, importAccount, updateAccount } = useAccount();
	const { createCharacter, currentCharacter, setCurrentCharacterIndex } = useCharacters();

	const [accountAction, setAccountAction] = useState("");
	const [error, setError] = useState("");
	const [exportedAccount, setExportedAccount] = useState("");

	const [accountIdModalShown, showAccountIdModal] = useState(false);

	return (
		<>
			<main className={styles.form}>
				<fieldset>
					<label htmlFor="account-id">
						Account ID
						<AiOutlineQuestionCircle
							title="Click me for info on what it is/what I use it for."
							onClick={() => showAccountIdModal(true)}
						/>
					</label>
					<Input
						name="account-id"
						value={account.id}
						placeholder="Optional"
						onChange={e => updateAccount({ id: e.currentTarget.value.toUpperCase() })}
					/>
				</fieldset>

				<fieldset>
					<label htmlFor="world">Characters</label>
					<select
						className={styles.characterSelector}
						value={currentCharacter?.id}
						onChange={e => {
							if (e.currentTarget.value === "create") {
								try {
									createCharacter();
									setCurrentCharacterIndex(-1);
									window.plausible("Character created");
								} catch (e) {
									if (e instanceof Error) {
										setError(e.message);
									}
								}
							} else {
								setCurrentCharacterIndex(
									account.characters.findIndex(({ id }) => id === e.currentTarget.value),
								);
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

				{accountAction ? (
					<div className={styles.export}>
						<IoArrowBackOutline
							title="Return"
							onClick={() => {
								setAccountAction("");
								setExportedAccount("");
							}}
						/>

						<input
							value={exportedAccount}
							onChange={e => accountAction === "import" && setExportedAccount(e.currentTarget.value)}
							onKeyUp={e => {
								if (e.key === "Enter" && accountAction === "import") {
									importAccount(exportedAccount);
								}
							}}
						/>

						{accountAction === "export" ? (
							<BiSolidCopy title="Copy" onClick={() => navigator.clipboard.writeText(exportedAccount)} />
						) : (
							<BsClipboard2Fill
								title="Import (and paste if neccessary)"
								onClick={async () => importAccount(exportedAccount || (await navigator.clipboard.readText()))}
							/>
						)}
					</div>
				) : (
					<div style={{ display: "flex", gap: "1rem" }}>
						<button type="button" className={styles.export} onClick={() => setAccountAction("import")}>
							Import Account
						</button>
						<button
							type="button"
							className={styles.export}
							onClick={() => {
								setAccountAction("export");
								setExportedAccount(JSON.stringify(account));
							}}
						>
							Export Account
						</button>
					</div>
				)}
			</main>

			<Footer>
				<span>
					Note: currently there's no character deletion function, but you can simply rename them. Everything
					in the site is auto-saved on return/done, so don't worry about that.
				</span>
			</Footer>

			{error && <p style={{ margin: "0 auto" }}>Error: {error.toLowerCase()}</p>}

			{accountIdModalShown && (
				<Modal className={styles.modal} onConfirm={() => showAccountIdModal(false)}>
					<p>
						First of all, this is entirely optional, you do not need to enter this in order to use any part of
						the site. As for what I use it: well, nothing really. I just save it locally and don't need it for
						anything.
					</p>

					<p>
						I eventually plan on using it exclusively as an ID for uploading your data and contributing to
						server-wide statistics I plan on making, but right now? It's useless and doesn't leave your PC.
					</p>

					<p>
						And what it is? Well, it's an identifier that I discovered one day. You can check it by hovering
						over your nickname near the EXP bar. I only know that it's account-wide, shared even between NA
						and EU.
					</p>

					<p>
						I don't know any way to use it outside of identifying purposes, especially when GMS doesn't have a
						public API yet. And even then, for it to be harmful I'd need to ask for your password/2FA token or
						something.
					</p>

					<p>
						In fact, I have no way of checking if what you put in is valid or not. (which is why I may
						eventually discard it in favor of simply using an UUID)
					</p>
				</Modal>
			)}
		</>
	);
}
