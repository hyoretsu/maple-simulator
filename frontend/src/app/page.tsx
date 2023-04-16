import { Metadata } from "next";

import CoreStatsInfo from "@components/CoreStatsInfo";
import EquipmentInventory from "@components/EquipmentInventory";
import ExpBar from "@components/ExpBar";
import Stats from "@components/Stats";

import { BottomBar, Styling } from "@styles/index";

import { siteName as title } from "./layout";

const description = "A project that aims to simulate various aspects of MapleStory in your browser.";

export const metadata: Metadata = {
	description,
	openGraph: {
		description,
		title,
	},
	title,
};

const Homepage: React.FC = () => {
	return (
		<>
			<Styling>
				<EquipmentInventory />
				<Stats />
			</Styling>
			<BottomBar>
				<CoreStatsInfo />
				<ExpBar />
			</BottomBar>
		</>
	);
};

export default Homepage;
