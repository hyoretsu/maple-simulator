import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

import { compilerOptions } from "./tsconfig.json";

const config: Config = {
  cache: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/modules/**/infra/http/controllers/*.(j|t)s", "src/modules/**/services/*.(j|t)s"],
  coverageDirectory: "coverage",
  coverageReporters: ["text-summary", "lcov"],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["js", "json", "ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/src/" }),
  passWithNoTests: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: ".*\\.(e2e-)?spec\\.ts$",
  transform: {
    "^.+\\.(j|t)s$": [
      "ts-jest",
      {
        astTransformers: {
          before: ["./nestjs-swagger-transformer.js"],
        },
      },
    ],
  },
};

export default config;
