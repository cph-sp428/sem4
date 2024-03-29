import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://cphsp428:b4UWIXoabyBp00c4@cluster0.7pyzfcv.mongodb.net/";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

async function run(){
    try {
        
        await client.connect();

        const data = client.db("sample_weatherdata").collection("data");
        console.log("Connected to the database");
 
        await data.findOne({_id: new ObjectId("5553a998e4b02cf7151190b8")}).then((result) => {
            console.log(result);
        });
        console.log("Connected to the database");

        const doc = {
            name: "Sebastian",
            age: 26,
            city: "Copenhagen"
        }

        await data.insertOne(doc).then((result) => {
            console.log(result);
            console.log("Document inserted");
        });

        await db.find().limit(2).toArray().then((result) => {
            console.log(result);
        });



    } catch{
        console.log("Error");
    }
}

run();