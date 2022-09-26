// eslint-disable-next-line node/no-extraneous-import
import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
	testEnvironment: 'node',
	roots: ['<rootDir>/src'],
	testMatch: ['**/*.test.ts'],
	transform: {
		['^.+\\.ts$']: 'ts-jest',
	},
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
}

export default config
