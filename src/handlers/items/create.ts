import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Create Single Item!',
      input: event,
    }, null, 2),
  };
}