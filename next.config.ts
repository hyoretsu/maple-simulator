import type { NextConfig } from "next";
import type { PHASE_TYPE } from "next/constants";

type FullNextConfig =
	| NextConfig
	| ((phase: PHASE_TYPE, defaults: { defaultConfig: NextConfig }) => NextConfig | Promise<NextConfig>);

const nextConfig: FullNextConfig = async phase => {
	const baseConf: NextConfig = {
		output: "export",
		productionBrowserSourceMaps: true,
		reactStrictMode: true,
		sassOptions: {
			logger: {
				debug: (message: string) => console.log(message),
				warn: (message: string) => console.warn(message),
			},
		},
		skipTrailingSlashRedirect: true,
		turbopack: {
			rules: {
				"*.svg": {
					as: "*.js",
					loaders: ["@svgr/webpack"],
				},
			},
		},
		typescript: {
			ignoreBuildErrors: true,
		},
		webpack: config => {
			config.module.rules.push({
				test: /\.svg$/i,
				use: ["@svgr/webpack"],
			});

			return config;
		},
	};

	// Dev-specific settings
	switch (phase) {
		case "phase-development-server":
			break;
		default:
			break;
	}

	return baseConf;
};

export default nextConfig;
