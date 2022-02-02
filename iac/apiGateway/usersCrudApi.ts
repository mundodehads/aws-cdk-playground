import { Stack } from 'aws-cdk-lib';
import { RestApi, LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';

export default class UsersCrudAPI {
  api: RestApi;

  constructor(stack: Stack) {
    this.api = new RestApi(stack, 'users-crud-api', {
      restApiName: 'Users CRUD API',
      description: 'This api contains a crud for an users table.',
    });
  }

  createLambdaIntegration({
    createUser,
    deleteUser,
    readUser,
    updateUser,
  }: {
    createUser: IFunction;
    deleteUser: IFunction;
    readUser: IFunction;
    updateUser: IFunction;
  }): void {
    const defaultLambdaOptions = {
      requestTemplates: {
        'application/json': JSON.stringify({ statusCode: '200' }),
      },
    };

    const createUserIntegration = new LambdaIntegration(
      createUser,
      defaultLambdaOptions
    );

    const deleteUserIntegration = new LambdaIntegration(
      deleteUser,
      defaultLambdaOptions
    );

    const readUserIntegration = new LambdaIntegration(
      readUser,
      defaultLambdaOptions
    );

    const updateUserIntegration = new LambdaIntegration(
      updateUser,
      defaultLambdaOptions
    );

    const users = this.api.root.addResource('users');
    users.addMethod('POST', createUserIntegration);

    const user = users.addResource('{userId}');
    user.addMethod('DELETE', deleteUserIntegration);
    user.addMethod('GET', readUserIntegration);
    user.addMethod('PUT', updateUserIntegration);
  }
}
