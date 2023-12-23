"use server";

import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_CONNECTION);
const database = client.db("puppy-title");
const resources = database.collection("titles");

export const getGameQuestion = async () => {
	const count = await resources.countDocuments();
	const ids = await resources
		.find({})
		.project({ _id: 1 })
		.map((item) => item._id)
		.toArray();

	const randomNumber = Math.floor(Math.random() * count);
	const randomImageId = ids[randomNumber].toString();

	return JSON.stringify(
		await resources.findOne({
			_id: new ObjectId(randomImageId),
		})
	);
};
