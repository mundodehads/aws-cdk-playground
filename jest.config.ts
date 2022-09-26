// eslint-disable-next-line node/no-extraneous-import
import type { Config } from '@jest/types'
import sharedConfig from './packages/shared/jest.config'
import stackConfig from './packages/stack/jest.config'
import userApiConfig from './packages/user-api/jest.config'

const config: Config.InitialOptions = {
	projects: [
		{
			...sharedConfig,
			roots: ['<rootDir>/packages/shared/src'],
			// collectCoverageFrom: ['<rootDir>/packages/shared/src/**/*.ts'],
			testMatch: ['<rootDir>/packages/shared/src/**/?(*.)+(test).[jt]s?(x)'],
		},
		{
			...stackConfig,
			roots: ['<rootDir>/packages/stack/src'],
			// collectCoverageFrom: ['<rootDir>/packages/stack/src/**/*.ts'],
			testMatch: ['<rootDir>/packages/stack/src/**/?(*.)+(test).[jt]s?(x)'],
		},
		{
			...userApiConfig,
			roots: ['<rootDir>/packages/user-api/src'],
			collectCoverageFrom: ['<rootDir>/packages/user-api/src/**/*.ts'],
			testMatch: ['<rootDir>/packages/user-api/src/**/?(*.)+(test).[jt]s?(x)'],
		},
	],
}

export default config
