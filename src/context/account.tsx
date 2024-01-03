"use client";
import copyObject from "@utils/copyObject";
import { Account, Character } from "maple-simulator";
import {
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { v4 as uuid } from "uuid";

type CreateCharacter = (charInfo?: Partial<Omit<Character, "id">>) => Character;
type UpdateAccount = (newAccountData: Partial<Pick<Account, "id">>) => void;
type UpdateCharacter = (id: string, updatedCharacter: Partial<Character>) => void;

interface AccountContext {
	account: Account;
	createCharacter: CreateCharacter;
	currentCharacter: Character | undefined;
	setCurrentCharacterIndex: (index: number) => void;
	updateAccount: UpdateAccount;
	updateCharacter: UpdateCharacter;
}

const AccountContext = createContext<AccountContext | null>(null);

export const defaultAccount: Account = {
	id: "",
	characters: [],
};

export const defaultCharacter: Omit<Character, "id"> = {
	bossingRoutine: {},
	level: 1,
	nickname: "Default",
	symbols: {
		Arcane: {
			// @ts-ignore
			level: 1,
			exp: 1,
		},
		Sacred: {
			// @ts-ignore
			level: 1,
			exp: 1,
		},
	},
	world: "Kronos",
};

const bumpCharacter = (character: Record<string, any>): boolean => {
	let changed = false;

	for (const [prop, value] of Object.entries(defaultCharacter)) {
		if (prop === "bossingRoutine" && !character.bossingRoutine) {
			character.bossingRoutine = copyObject(value);
			changed = true;
		} else if (prop === "symbols") {
			if (!character.symbols) {
				character.symbols = {};
				changed = true;
			}

			if (character.level > 200) {
				const arcaneSymbolLevels = [200, 210, 220, 225, 230, 235];

				if (!character.symbols.Arcane) {
					character.symbols.Arcane = [];
				}

				for (const [index, unlockLevel] of arcaneSymbolLevels.entries()) {
					if (character.level >= unlockLevel && !character.symbols.Arcane[index]) {
						character.symbols.Arcane[index] = copyObject(defaultCharacter.symbols.Arcane);
						changed = true;
					}
				}
			}

			if (character.level > 260) {
				const sacredSymbolLevels = [260, 265, 270, 275, 280, 285];

				if (!character.symbols.Sacred) {
					character.symbols.Sacred = [];
				}

				for (const [index, unlockLevel] of sacredSymbolLevels.entries()) {
					if (character.level >= unlockLevel && !character.symbols.Sacred[index]) {
						character.symbols.Sacred[index] = copyObject(defaultCharacter.symbols.Sacred);
						changed = true;
					}
				}
			}
		} else if (!character[prop]) {
			character[prop] = value;
			changed = true;
		}

		if (Object.entries(character.bossingRoutine).length > 0) {
			const normalRanmaru = character.bossingRoutine["Normal Mori Ranmaru"];
			const hardRanmaru = character.bossingRoutine["Hard Mori Ranmaru"];

			if (normalRanmaru) {
				character.bossingRoutine["Normal Ranmaru"] = copyObject(normalRanmaru);
				// biome-ignore lint/performance/noDelete: <explanation>
				delete character.bossingRoutine["Normal Mori Ranmaru"];
				changed = true;
			}
			if (hardRanmaru) {
				character.bossingRoutine["Hard Ranmaru"] = copyObject(hardRanmaru);
				// biome-ignore lint/performance/noDelete: <explanation>
				delete character.bossingRoutine["Hard Mori Ranmaru"];
				changed = true;
			}
		}
	}

	return changed;
};

export function AccountProvider({ children }: PropsWithChildren) {
	const [account, setAccount] = useState<Account>(defaultAccount);
	const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

	const currentCharacter = useMemo<Character | undefined>(() => {
		const character = account.characters.at(currentCharacterIndex);

		if (character) {
			localStorage.setItem("@maple-simulator:current_character", character.id);
		}

		return character;
	}, [account, currentCharacterIndex]);

	useEffect(() => {
		const storedCharacters = localStorage.getItem("@maple-simulator:characters");
		let parsedCharacters: Array<string | Character> = [];
		if (storedCharacters) {
			parsedCharacters = JSON.parse(storedCharacters);

			// Old character logic migration
			if (typeof parsedCharacters[0] !== "string") {
				const characterIds: string[] = [];

				for (const character of parsedCharacters as Character[]) {
					bumpCharacter(character);

					localStorage.setItem(`@maple-simulator:character_${character.id}`, JSON.stringify(character));
					characterIds.push(character.id);
				}

				parsedCharacters = characterIds;
				localStorage.setItem("@maple-simulator:characters", JSON.stringify(characterIds));
			}
		}

		setAccount(old => {
			const storedAccount = copyObject(old);

			const storedId = localStorage.getItem("@maple-simulator:account_id");
			if (storedId) {
				Object.assign(storedAccount, { id: storedId });
			}

			const characters = parsedCharacters.reduce(
				(arr, characterId) => {
					let updated = false;

					const characterStr = localStorage.getItem(`@maple-simulator:character_${characterId}`);
					if (characterStr) {
						const character = JSON.parse(characterStr);
						updated ||= bumpCharacter(character);

						if (updated) {
							localStorage.setItem(`@maple-simulator:character_${characterId}`, JSON.stringify(character));
						}

						arr[arr.length] = character;
					}

					return arr;
				},
				[] as Character[],
			);

			Object.assign(storedAccount, { characters });

			const storedCurrentCharacterId = localStorage.getItem("@maple-simulator:current_character");
			if (storedCurrentCharacterId) {
				setCurrentCharacterIndex(
					storedAccount.characters.findIndex(({ id }) => id === storedCurrentCharacterId),
				);
			}

			return storedAccount;
		});
	}, []);

	const createCharacter = useCallback<CreateCharacter>(
		charInfo => {
			if (
				account.characters.find(
					({ nickname }) => nickname === (charInfo?.nickname || defaultCharacter.nickname),
				)
			) {
				throw new Error("Character already exists");
			}

			const newCharacter = {
				...copyObject(defaultCharacter),
				...charInfo,
				id: uuid(),
			};

			setAccount(old => {
				const newAccount = copyObject(old);

				newAccount.characters.push(newCharacter);
				localStorage.setItem(`@maple-simulator:character_${newCharacter.id}`, JSON.stringify(newCharacter));
				localStorage.setItem(
					"@maple-simulator:characters",
					JSON.stringify(
						newAccount.characters.reduce(
							(arr, { id }) => {
								arr[arr.length] = id;
								return arr;
							},
							[] as string[],
						),
					),
				);

				return newAccount;
			});

			return newCharacter;
		},
		[account],
	);

	const updateAccount = useCallback<UpdateAccount>(({ id }) => {
		setAccount(old => {
			const newAccount = copyObject(old);

			if (id !== undefined) {
				newAccount.id = id;
				localStorage.setItem("@maple-simulator:account_id", id);
			}

			return newAccount;
		});
	}, []);

	const updateCharacter = useCallback<UpdateCharacter>((id, updatedCharacter) => {
		setAccount(old => {
			const newAccount = copyObject(old);
			const character = newAccount.characters.find(({ id: characterId }) => characterId === id) as Character;

			Object.assign(character, updatedCharacter);
			localStorage.setItem(`@maple-simulator:character_${character.id}`, JSON.stringify(character));

			return newAccount;
		});
	}, []);

	const accountData: AccountContext = useMemo(() => {
		return {
			account,
			createCharacter,
			currentCharacter,
			setCurrentCharacterIndex,
			updateAccount,
			updateCharacter,
		};
	}, [account, createCharacter, currentCharacter, updateAccount, updateCharacter]);

	return <AccountContext.Provider value={accountData}>{children}</AccountContext.Provider>;
}

class AccountError extends Error {
	constructor(hookName: string) {
		super(`\`${hookName}()\` must be used within an <AccountProvider />`);
	}
}

export const useAccount = (): Pick<AccountContext, "account" | "updateAccount"> => {
	const context = useContext(AccountContext);
	if (!context) {
		throw new AccountError("useAccount");
	}

	const { account, updateAccount } = context;

	return {
		account,
		updateAccount,
	};
};

export const useAccountInfo = (): Pick<Account, "id"> => {
	const context = useContext(AccountContext);
	if (!context) {
		throw new AccountError("useAccountInfo");
	}

	const { account } = context;

	return {
		id: account.id,
	};
};

interface UseCharactersReturn
	extends Pick<
		AccountContext,
		"createCharacter" | "currentCharacter" | "setCurrentCharacterIndex" | "updateCharacter"
	> {
	characters: Character[];
}

export const useCharacters = (): UseCharactersReturn => {
	const context = useContext(AccountContext);
	if (!context) {
		throw new AccountError("useCharacters");
	}

	const {
		account: { characters },
		createCharacter,
		currentCharacter,
		setCurrentCharacterIndex,
		updateCharacter,
	} = context;

	return {
		characters,
		createCharacter,
		currentCharacter,
		setCurrentCharacterIndex,
		updateCharacter,
	};
};
