import { DEFAULT_ENVIRONMENT, DEFAULT_REGION } from '@aws-cdk-playground/shared'
import type { APIGatewayProxyEvent, Context } from 'aws-lambda'

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
	console.log('Request received with:', { event, context })

	try {
		const { userId } = event.pathParameters || {}

		return {
			statusCode: 200,
			headers: {},
			body: JSON.stringify({
				region: DEFAULT_ENVIRONMENT,
				environment: DEFAULT_REGION,
				userId,
			}),
		}
	} catch (error) {
		console.log(error)

		return {
			statusCode: 500,
			headers: {},
			body: JSON.stringify({
				error,
			}),
		}
	}
}
