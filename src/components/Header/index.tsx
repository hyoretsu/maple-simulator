"use client";
import { Link } from "@hyoretsu/react-components";
import { usePathname } from "next/navigation";
import styles from "./styles.module.scss";

const pages = [
	{ name: "Boss Income Tracker", route: "/bosses/tracker" },
	{ name: "Flame Score Calculator", route: "/flames/calculator" },
	{ name: "Symbol Calculator", route: "/symbols/calculator" },
	{ name: "Account", route: "/account" },
];

export default function Header() {
	const pathname = usePathname();

	return (
		<header className={styles.header}>
			<nav>
				{pages.map(({ name, route }) => {
					const active = pathname.startsWith(route);

					return (
						<Link
							key={route}
							href={route}
							style={{
								...(active
									? { backgroundColor: "#9d5300", borderColor: "#972500" }
									: { backgroundColor: "#3b444a", borderColor: "#3b464c" }),
							}}
						>
							{name}
						</Link>
					);
				})}
			</nav>
		</header>
	);
}
