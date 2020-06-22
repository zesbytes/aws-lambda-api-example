import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';

// example of including lodash library in project. we use lodash-es as it allows for tree-shaking.
import { random }  from 'lodash-es';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  
  console.log(`random number from lodash library: ${random(1,10)}`);
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Get Single Item!',
      input: event,
    }, null, 2),
  };
}
