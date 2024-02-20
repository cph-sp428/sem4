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

        const database = client.db("sample_weatherdata").collection("data");
        console.log("Connected to the database");
 
        await database.findOne({_id: new ObjectId("5553a998e4b02cf7151190b8")}).then((result) => {
            console.log(result);
        });



    } catch{
        console.log("Error");
    } finally {
        await client.close();
    }
}

run();