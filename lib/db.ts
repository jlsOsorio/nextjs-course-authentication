import { MongoClient } from 'mongodb';

export async function connectToDatabase(): Promise<MongoClient> {
  const connection = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER_NAME}.rfslo2e.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(connection);

  return await client.connect();
}
