import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const url =
  "mongodb+srv://cphsp428:b4UWIXoabyBp00c4@cluster0.7pyzfcv.mongodb.net/";

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();




  } catch (error) {
    console.log("Error: ", error);
  } finally {
    await client.close();
  }
}

run();
