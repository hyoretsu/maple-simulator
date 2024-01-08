import CharacterGuard from "@components/CharacterGuard";
import CharacterSelector from "@components/CharacterSelector";
import Footer from "@components/Footer";
import consumables from "@data/consumables.json";
import Body from "./components/Body";
import styles from "./styles.module.scss";

const rebirthFlames = consumables.filter(
	item => item.name.includes("Rebirth Flame") && !item.name.includes("Karma"),
);

export const metadata = {
	title: "Flame Score Calculator",
};

export default function FlamesCalculator() {
	return (
		<>
			<main className={styles.main}>
				<h1>
					<img
						src="/images/assets/2048716.png"
						alt=""
						title="Powerful Rebirth Flame"
						width={28}
						height={33}
					/>
					Calculator
				</h1>

				<CharacterGuard>
					<CharacterSelector />

					<Body />
				</CharacterGuard>
			</main>

			<Footer>
				<p>Note: I considered Scardor's endgame scaling.</p>
				<p>
					Why? Because why would you differentiate the exact same flame based on progresion? (That wouldn't be
					better done by doing stat equivalence)
				</p>
				<p>
					Also we still use the same docs from 2020, with no adjustments that I know of having been made to
					the stat ratio since then. That plus his idea of lategame as of New Age goes all the way to lv285,
					so yeah... That would make a grand total of 1611 characters at endgame (across all GMS worlds).
				</p>

				<p>Fun fact: there are 13 different kinds of flames</p>
				<div className={styles.flamesDisplay}>
					{rebirthFlames.map(flame => (
						<img key={flame.id} src={`/images/assets/${flame.id}.png`} alt="" title={flame.name} />
					))}
				</div>
			</Footer>
		</>
	);
}
