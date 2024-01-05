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
				<img src="/images/items/intense_power_crystal.png" alt="" />
				Tracker
			</h1>

			<CharacterGuard>
				<CharacterSelector />

				<BossTable />
			</CharacterGuard>
		</main>
	);
}
