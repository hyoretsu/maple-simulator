import { CharProvider } from "@context/char";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

import "@public/global.css";

const url = "https://maple-simulator.vercel.app";

const siteColor = "#b4e114";
export const siteName = "Maple Simulator";

export function generateMetadata(): Metadata {
	return {
		applicationName: siteName,
		appleWebApp: {
			title: siteName,
		},
		openGraph: {
			images: [
				{
					url: `${url}/images/opengraph.jpg`,
					width: 1200,
					height: 627,
					alt: siteName,
				},
			],
			siteName,
			type: "website",
		},
		themeColor: siteColor,
		title: {
			default: siteName,
			template: `%s | ${siteName}`,
		},
		twitter: {
			card: "summary_large_image",
			creator: `${process.env.NEXT_PUBLIC_SITE_CONTENT_CREATOR}` || "@hyoretsu",
		},
	};
}

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
			</head>
			<body>
				{/* <DefaultSeo
				defaultTitle={site_name}
				facebook={{ appId: String(process.env.NEXT_PUBLIC_FACEBOOK_APP_ID) }}
				openGraph={{
					images: [
						{
							url: `${url}/images/opengraph.jpg`,
							width: 1200,
							height: 627,
							alt: site_name,
						},
					],
					site_name,
					type: "website",
					url: url + pathname,
				}}
				titleTemplate={`%s | ${site_name}`}
				twitter={{
					cardType: "summary_large_image",
					handle: `${process.env.NEXT_PUBLIC_SITE_CONTENT_CREATOR}` || "@hyoretsu",
					site: `${process.env.NEXT_PUBLIC_SITE_OWNER}` || "@hyoretsu",
				}}
			/> */}
				<CharProvider>{children}</CharProvider>
			</body>
		</html>
	);
}
