import { Stack } from 'aws-cdk-lib';
import { Table, AttributeType, BillingMode } from 'aws-cdk-lib/aws-dynamodb';

export default class UsersTable {
  user: Table;

  constructor(stack: Stack) {
    this.user = new Table(stack, `${process.env.STAGE || 'sandbox'}.users`, {
      partitionKey: { name: 'userId', type: AttributeType.STRING },
      billingMode: BillingMode.PROVISIONED,
      readCapacity: 1,
      writeCapacity: 1,
    });
  }
}
