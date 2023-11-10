const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = phase => {
	/** @type {import('next').NextConfig} */
	const baseConf = {
		compiler: {
			styledComponents: true,
		},
		eslint: {
			ignoreDuringBuilds: true,
		},
		i18n: {
			locales: ["en", "pt"],
			defaultLocale: "en",
		},
		images: {
			domains: ["maple-sim.s3.amazonaws.com"],
		},
		productionBrowserSourceMaps: true,
		reactStrictMode: true,
		swcMinify: true,
		typescript: {
			ignoreBuildErrors: true,
		},
		webpack: (config, options) => {
			config.module.rules.push({
				test: /\.svg$/,
				use: [{ loader: "@svgr/webpack" }],
			});

			return config;
		},
	};

	// Dev-specific settings
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		Object.assign(baseConf, {});
	} else {
		Object.assign(baseConf, {});
	}

	return baseConf;
};
