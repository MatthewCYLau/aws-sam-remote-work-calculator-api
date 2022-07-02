# AWS Serverless Remote Work Calculator

An AWS Serverless application powered by [SAM](https://aws.amazon.com/serverless/sam/) which calculates work remote savings:moneybag:

## Pre-requisites

- AWS SAM CLI - [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
- Node.js - [Install Node.js 16](https://nodejs.org/en/), including the npm package management tool.
- Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community).

## Build/deploy application

```bash
sam build
sam deploy --guided
```

## Cleanup

```bash
aws cloudformation delete-stack --stack-name aws-sam-remote-work-calculator-api
```
