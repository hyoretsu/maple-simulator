import CharacterGuard from "@components/CharacterGuard";
import CharacterSelector from "@components/CharacterSelector";
import BossTable from "./components/BossTable";
import styles from "./styles.module.scss";

export const metadata = {
	title: "Boss Income Tracker",
};

export default function BossesTracker() {
	return (
		<main className={styles.main}>
			<h1>
				<img src="/images/assets/4001886.png" alt="" width={32} height={38} />
				Tracker
			</h1>

			<CharacterGuard>
				<CharacterSelector />

				<BossTable />
			</CharacterGuard>
		</main>
	);
}
