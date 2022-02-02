import { Stack } from 'aws-cdk-lib';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { IFunction } from 'aws-cdk-lib/aws-lambda';

export default class CreateUserFunction {
  handler: IFunction;

  constructor(stack: Stack) {
    this.handler = new Function(stack, 'CreateUserHandler', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('dist/src/handlers'),
      handler: 'createUser.main',
      environment: {},
    });
  }
}
