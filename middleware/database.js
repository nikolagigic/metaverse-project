import { MongoClient } from 'mongodb';

import nextConnect from 'next-connect';

MONGO_DB = 'mongodb+srv://nikolag:Nindzata96@cluster0.xwrxt.mongodb.net/accounts?retryWrites=true&w=majority'

const client = new MongoClient(MONGO_DB, {

  useNewUrlParser: true,

  useUnifiedTopology: true,

});

async function database(req, res, next) {

  if (!client.isConnected()) await client.connect();

  req.dbClient = client;

  req.db = client.db('MCT');

  return next();

}

const middleware = nextConnect();

middleware.use(database);

export default middleware;