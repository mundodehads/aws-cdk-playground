import { App, Stack, StackProps } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { UserApi } from '@aws-cdk-playground/user-api'
import { DEFAULT_ENVIRONMENT, DEFAULT_REGION } from '@aws-cdk-playground/shared'

const {
	ENVIRONMENT = DEFAULT_ENVIRONMENT,
	STACK_NAME = `${ENVIRONMENT}-AwsCdkPlayground`,
	ACCOUNT = '', // Need to be set in env to deploy
	REGION = DEFAULT_REGION,
} = process.env

export class AwsCdkPlaygroundStack extends Stack {
	static #app = new App()

	static create() {
		new AwsCdkPlaygroundStack(this.#app, STACK_NAME, {
			env: {
				region: REGION,
				account: ACCOUNT,
			},
		})
	}

	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props)

		new UserApi({
			stack: this,
			id: 'UserApi',
		})
	}
}

export default AwsCdkPlaygroundStack.create()
