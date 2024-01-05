const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = async (phase, { defaultConfig }) => {
	/** @type {import('next').NextConfig} */
	const baseConf = {
		eslint: {
			ignoreDuringBuilds: true,
		},
		experimental: {
			turbo: {
				rules: {
					"*.svg": {
						loaders: ["@svgr/webpack"],
						as: "*.js",
					},
				},
			},
		},
		i18n: {
			locales: ["en", "pt"],
			defaultLocale: "en",
		},
		images: {
			remotePatterns: [
				{
					hostname: "d1jarb7xa67pb9.cloudfront.net",
					protocol: "https",
				},
			],
		},
		productionBrowserSourceMaps: true,
		reactStrictMode: true,
		rewrites: () => [
			{
				source: "/images/:path*",
				destination: "https://d1jarb7xa67pb9.cloudfront.net/images/:path*",
			},
		],
		sassOptions: {
			logger: {
				warn: message => console.warn(message),
				debug: message => console.log(message),
			},
		},
		skipTrailingSlashRedirect: true,
		swcMinify: true,
		typescript: {
			ignoreBuildErrors: true,
		},
		webpack: (config, options) => {
			config.module.rules.push({
				test: /\.svg$/i,
				use: ["@svgr/webpack"],
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
