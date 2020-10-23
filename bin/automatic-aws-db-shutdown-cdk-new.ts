
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import {LambdaStack} from '../lib/lambda-stack';
import {PipelineStack} from "../lib/pipeline-stack";

const accountId = '810799446236';
const region = 'eu-west-1';
const instanceId = 'testdb';
const instanceARN = 'arn:aws:rds:eu-west-1:810799446236:db:testdb';

const app = new cdk.App();
const lambdaStack = new LambdaStack(app, 'LambdaStack', {
    env: {
        account: accountId,
        region: region
    },
    instanceId: instanceId,
    instanceARN: instanceARN
});

new PipelineStack(app, 'PipelineStack', {
    env: {
        account: accountId,
        region: region
    },
    startUpLambdaCode: lambdaStack.startUpLambdaCode,
    shutDownLambdaCode: lambdaStack.shutDownLambdaCode,
});

app.synth();
