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
type UpdateAccount = (newAccountData: Partial<Pick<Account, "id" | "characters">>) => void;
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
	world: "Kronos",
};

const bumpCharacter = (character: Record<string, any>): boolean => {
	let changed = false;

	for (const [prop, value] of Object.entries(defaultCharacter)) {
		if (!character[prop]) {
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
		setAccount(old => {
			const storedAccount = copyObject(old);

			const storedId = localStorage.getItem("@maple-simulator:account_id");
			if (storedId) {
				Object.assign(storedAccount, { id: storedId });
			}

			const storedCharactersStr = localStorage.getItem("@maple-simulator:characters");
			if (storedCharactersStr) {
				const storedCharacters: Character[] = JSON.parse(storedCharactersStr);

				let updated = false;
				for (const character of storedCharacters) {
					updated ||= bumpCharacter(character);
				}

				if (updated) {
					localStorage.setItem("@maple-simulator:characters", JSON.stringify(storedCharacters));
				}

				Object.assign(storedAccount, {
					characters: storedCharacters.sort(({ nickname: nick1 }, { nickname: nick2 }) => {
						if (nick1 < nick2) return -1;

						if (nick1 > nick2) return 1;

						return 0;
					}),
				});
			}

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
				localStorage.setItem("@maple-simulator:characters", JSON.stringify(newAccount.characters));

				return newAccount;
			});

			return newCharacter;
		},
		[account],
	);

	const updateAccount = useCallback<UpdateAccount>(({ id, characters }) => {
		setAccount(old => {
			const newAccount = copyObject(old);

			if (id !== undefined) {
				newAccount.id = id;
				localStorage.setItem("@maple-simulator:account_id", id);
			}
			if (characters !== undefined) {
				const newCharacters = characters.map(character => ({ ...defaultCharacter, ...character }));
				newAccount.characters = newCharacters;
				localStorage.setItem("@maple-simulator:characters", JSON.stringify(newCharacters));
			}

			return newAccount;
		});
	}, []);

	const updateCharacter = useCallback<UpdateCharacter>((id, updatedCharacter) => {
		setAccount(old => {
			const newAccount = copyObject(old);

			for (const character of newAccount.characters) {
				if (character.id === id) {
					Object.assign(character, updatedCharacter);
					break;
				}
			}

			localStorage.setItem("@maple-simulator:characters", JSON.stringify(newAccount.characters));

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
