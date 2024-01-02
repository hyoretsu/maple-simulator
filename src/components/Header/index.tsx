"use client";
import { Link } from "@hyoretsu/react-components";
import { usePathname } from "next/navigation";
import styles from "./styles.module.scss";

const pages = [
	{ name: "Boss Income Tracker", route: "/bosses/tracker" },
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
									? { backgroundColor: "#ffaf0e", borderColor: "#e7884d" }
									: { backgroundColor: "#999999", borderColor: "#858585" }),
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
