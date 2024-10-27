import CharacterGuard from "@components/CharacterGuard";
import CharacterSelector from "@components/CharacterSelector";
import type { PropsWithChildren } from "react";
import styles from "./styles.module.scss";

export const metadata = {
	title: "Characters",
};

export default function Layout({ children }: PropsWithChildren) {
	return (
		<main className={styles.main}>
			<CharacterGuard>
				<label htmlFor="character-selector">Current:</label>
				<CharacterSelector allowCreation />

				{children}
			</CharacterGuard>
		</main>
	);
}
