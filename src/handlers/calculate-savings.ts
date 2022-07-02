import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const calculateSavingsHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body);
  console.log(body);
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*", // Allow from anywhere
      "Access-Control-Allow-Methods": "POST", // Allow only POST request
    },
    body: JSON.stringify({
      savings: Math.floor(Math.random() * 100) + 1,
      shouldWorkRemote: Math.random() < 0.5,
    }),
  };

  return response;
};
