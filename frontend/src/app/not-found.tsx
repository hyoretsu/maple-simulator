import type { Metadata } from "next";
import { IoMdCloseCircleOutline } from "react-icons/io";

import Container from "@styles/not-found";

export const metadata: Metadata = {
	robots: {
		follow: false,
		index: false,
	},
};

export default function NotFound() {
	return (
		<>
			<Container>
				<IoMdCloseCircleOutline />
				<span>Error 404</span>
				<span>Not Found</span>
			</Container>
		</>
	);
}
