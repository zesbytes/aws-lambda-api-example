import 'source-map-support/register';

import { APIGatewayProxyHandler } from 'aws-lambda';
import createApi from 'lambda-api';

// TODO - configure globally
const api = createApi();

api.use((_req, res, next) => {
  res.cors({});
  next();
})

// TODO - explicitly handle content types

api.get('/agents', async (_req, res) => { 
  res.send('get all agents');
});

api.get('/agents/:id', async (req, res) => {
    res.send('get single agent by id: ' + JSON.stringify(req.params));
});

export const handler : APIGatewayProxyHandler = async (event, context) => {
  return await api.run(event, context);
}
