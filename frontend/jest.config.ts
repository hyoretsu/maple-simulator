import { Config } from "jest";

const config: Config = {
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: [
		"src/app/**/*.tsx",
		"src/data/hooks/*.tsx",
		"src/ui/components/**/*.tsx",
		"!src/data/hooks/index.tsx",
	],
	coverageDirectory: "coverage",
	coverageReporters: ["text-summary", "lcov"],
	moduleFileExtensions: ["tsx", "ts", "js", "json"],
	preset: "ts-jest",
	roots: ["<rootDir>/src"],
	testMatch: ["<rootDir>/src/__tests__/**/*.spec.{ts,tsx}"],
	transformIgnorePatterns: ["<rootDir>/node_modules/"],
};

export default config;
