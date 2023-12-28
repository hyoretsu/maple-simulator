import CoreStatsInfo from "components/CoreStatsInfo";
import DetailedStats from "components/DetailedStats";
import EquipmentInventory from "components/EquipmentInventory";
import ExpBar from "components/ExpBar";
import Stats from "components/Stats";
import { Metadata } from "next";
import { siteName as title } from "./layout";
import styles from "./styles.module.scss";

const description = "A project that aims to simulate various aspects of MapleStory in your browser.";

export const metadata: Metadata = {
	description,
	openGraph: {
		description,
		title,
	},
	title,
};

export default function Homepage() {
	return (
		<>
			<main className={styles.content}>
				<EquipmentInventory />
				<div className={styles.stats}>
					<Stats />
					<DetailedStats />
				</div>
			</main>

			<footer className={styles.bottomBar}>
				<CoreStatsInfo />
				<ExpBar />
			</footer>
		</>
	);
}
