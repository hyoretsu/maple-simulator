import Header from "@components/Header";
import { AccountProvider } from "@context/account";
import { PropsWithChildren } from "react";
import "./_global.scss";
import WebVitals from "./components/WebVitals";
import "./fonts";

const url = "https://maple-simulator.vercel.app";

const siteColor = "#b4e114";
const siteName = "Maple Simulator";

export const metadata = {
	applicationName: siteName,
	appleWebApp: {
		title: siteName,
	},
	metadataBase: new URL(url),
	openGraph: {
		images: [
			{
				url: "/images/opengraph.jpg",
				width: 1200,
				height: 627,
				alt: siteName,
			},
		],
		siteName,
		type: "website",
	},
	title: {
		default: siteName,
		template: `%s | ${siteName}`,
	},
	twitter: {
		card: "summary_large_image",
		creator: `${process.env.NEXT_PUBLIC_SITE_CONTENT_CREATOR}` || "@hyoretsu",
	},
};
export const viewport = {
	themeColor: siteColor,
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<head>
				<link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
				<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
				<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
				<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-chrome-192x192.png" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color={siteColor} />
				<link rel="manifest" href="/site.webmanifest" />

				<script
					defer
					data-domain="maple-simulator.hyoretsu.com"
					src="https://plausible.hyoretsu.com/js/script.outbound-links.js"
				/>
				<script
					dangerouslySetInnerHTML={{
						__html:
							"window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}",
					}}
				/>
			</head>
			<body>
				<script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
				<script
					id="google-analytics"
					dangerouslySetInnerHTML={{
						__html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag("js",new Date());gtag("config","${process.env.NEXT_PUBLIC_GA_ID}",{page_path: window.location.pathname})`,
					}}
				/>

				<Header />

				<AccountProvider>{children}</AccountProvider>

				<WebVitals />
			</body>
		</html>
	);
}
