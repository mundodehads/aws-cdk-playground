import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import AWSCDKPlaygroundStack from './app';

describe('AWS CDK Playground Stack Template Created', () => {
  const app = new cdk.App();
  const stack = new AWSCDKPlaygroundStack(app, 'MyTestStack');
  const template = Template.fromStack(stack);

  it('should have a DynamoDB Table resource', () => {
    template.hasResourceProperties('AWS::DynamoDB::Table', {});
  });

  it('should have a Lambda Function resource', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {});
  });

  it('should have a ApiGateway RestAPI resource', () => {
    template.hasResourceProperties('AWS::ApiGateway::RestApi', {});
  });

  it('should have a StepFunctions StateMachine resource', () => {
    template.hasResourceProperties('AWS::StepFunctions::StateMachine', {});
  });
});
