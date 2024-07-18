"use server";

import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_CONNECTION);
const database = client.db("puppy-title");
const resources = database.collection("titles");

export const getGameQuestion = async () => {
	const docs = await resources
		.aggregate([{ $sample: { size: 1 } }])
		.toArray();

	return JSON.stringify(docs[0]);
};
