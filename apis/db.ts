"use server";

import { MongoClient } from "mongodb";

const mongoConnection = process.env.MONGODB_CONNECTION;
if (!mongoConnection) {
  throw new Error("MONGODB_CONNECTION environment variable is not set");
}
const client = new MongoClient(mongoConnection);
const database = client.db("puppy-title");
const resources = database.collection("titles");

export const getGameQuestion = async () => {
  const docs = await resources.aggregate([{ $sample: { size: 1 } }]).toArray();

  return JSON.stringify(docs[0]);
};
