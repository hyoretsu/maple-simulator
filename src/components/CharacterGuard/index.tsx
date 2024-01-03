"use client";
import { useCharacters } from "@context/account";
import { Link } from "@hyoretsu/react-components";
import { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

export default function CharacterGuard({ children }: PropsWithChildren) {
	const { currentCharacter } = useCharacters();

	if (!currentCharacter) {
		return (
			<Link className={styles.noCharacter} href="/account">
				It seems you don't have any characters created yet. Please go to the Account page (or click here) and
				create at least one.
			</Link>
		);
	}

	return children;
}
