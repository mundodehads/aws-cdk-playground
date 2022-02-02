import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import UsersTable from './dynamodb/usersTable';
import UsersCrudAPI from './apiGateway/usersCrudApi';
import CreateUserFunction from './lambda/createUser';
import DeleteUserFunction from './lambda/deleteUser';
import ReadUserFunction from './lambda/readUser';
import UpdateUserFunction from './lambda/updateUser';
import DeleteUserThirdPartyFunction from './lambda/deleteUserThirdParty';
import DeleteUserDatabaseFunction from './lambda/deleteUserDatabase';
import AsyncDeleteStateMachine from './stepFunctions/asyncDeleteUser';

class AWSCDKPlaygroundStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new UsersTable(this);

    const createUser = new CreateUserFunction(this);
    const deleteUser = new DeleteUserFunction(this);
    const readUser = new ReadUserFunction(this);
    const updateUser = new UpdateUserFunction(this);
    const deleteUserThirdParty = new DeleteUserThirdPartyFunction(this);
    const deleteUserDatabase = new DeleteUserDatabaseFunction(this);

    const usersCrudAPI = new UsersCrudAPI(this);
    usersCrudAPI.createLambdaIntegration({
      createUser: createUser.handler,
      deleteUser: deleteUser.handler,
      readUser: readUser.handler,
      updateUser: updateUser.handler,
    });

    new AsyncDeleteStateMachine(this, {
      deleteUserThirdParty: deleteUserThirdParty.handler,
      deleteUserDatabase: deleteUserDatabase.handler,
    });
  }
}

const app = new cdk.App();
new AWSCDKPlaygroundStack(app, 'AWSCDKPlaygroundStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */
  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

export default AWSCDKPlaygroundStack;
