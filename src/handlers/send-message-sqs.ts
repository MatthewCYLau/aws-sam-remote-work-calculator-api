import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

// Create clients and set shared const values outside of the handler.
import CustomSqsClient from "../utils/sqs";

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
export const sendMessageToSqsHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }
  // All log statements are written to CloudWatch
  console.info("received:", event);

  // Get id and name from the body of the request
  const body = JSON.parse(event.body);
  // const id = body.id;
  // const name = body.name;

  const client = new CustomSqsClient();
  const result = await client.send(body);

  const response = {
    statusCode: 201,
    body: JSON.stringify({ id: result.MessageId }),
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*", // Allow from anywhere
      "Access-Control-Allow-Methods": "POST", // Allow only POST request
    },
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
