import { Stack, Duration } from 'aws-cdk-lib';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import {
  StateMachine,
  Choice,
  Condition,
  Succeed,
  Fail,
} from 'aws-cdk-lib/aws-stepfunctions';
import { LambdaInvoke } from 'aws-cdk-lib/aws-stepfunctions-tasks';

export default class AsyncDeleteStateMachine {
  stateMachine: StateMachine;

  constructor(
    stack: Stack,
    {
      deleteUserThirdParty,
      deleteUserDatabase,
    }: {
      deleteUserThirdParty: IFunction;
      deleteUserDatabase: IFunction;
    }
  ) {
    const callDeleteUserThirdParty = new LambdaInvoke(stack, 'Submit Job', {
      lambdaFunction: deleteUserThirdParty,
      outputPath: '$.Payload',
    });

    const callDeleteUserDatabase = new LambdaInvoke(stack, 'Get Job Status', {
      lambdaFunction: deleteUserDatabase,
      inputPath: '$.userId',
      outputPath: '$.Payload',
    });

    const definition = callDeleteUserThirdParty
      .next(callDeleteUserDatabase)
      .next(
        new Choice(stack, 'Job Complete?')
          .when(
            Condition.stringEquals('$.status', 'SUCCEEDED'),
            new Succeed(stack, 'User is now deleted!')
          )
          .when(
            Condition.stringEquals('$.status', 'FAILED'),
            new Fail(stack, 'User could not be deleted', {
              error: 'WorkflowFailure',
              cause: 'Something went wrong',
            })
          )
      );

    this.stateMachine = new StateMachine(stack, 'AsyncDeleteUserStateMachine', {
      definition,
      timeout: Duration.minutes(1),
    });
  }
}
