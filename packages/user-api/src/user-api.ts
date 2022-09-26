import { join } from 'path'
import { Construct } from 'constructs'
import { Stack } from 'aws-cdk-lib'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { RestApi, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'

export class UserApi extends Construct {
	getUserLambda: NodejsFunction

	constructor({ stack, id }: { stack: Stack; id: string }) {
		super(stack, id)

		this.getUserLambda = new NodejsFunction(this, 'GetUser', {
			entry: join(__dirname, 'functions/get-user.js'),
			bundling: {
				externalModules: ['aws-sdk'],
			},
			environment: {
				NODE_ENV: 'production',
			},
			runtime: Runtime.NODEJS_16_X,
		})

		const userApi = new RestApi(this, 'UserAPI', {
			restApiName: 'User API',
			deployOptions: {
				stageName: 'v1',
			},
		})

		const getUserIntegration = new LambdaIntegration(this.getUserLambda)

		const users = userApi.root.addResource('users')

		const user = users.addResource('{userId}')
		user.addMethod('GET', getUserIntegration)
	}
}
