import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import personController from "./controller/personController";
import addressController from "./controller/addressController";
import { MONGODB_URL } from "./config";

async function run() {
  try {
    await mongoose.connect(MONGODB_URL);

    // let address = await addressController.createAddress({
    //   street: "Lyngbyvej",
    //   city: "København",
    //   state: "Hovedstaden",
    //   zip: 2100,
    // });

    // console.log(address);
  
    let person = await personController.createPerson({
      name: "John Doe",
      email: "johndoe@email.com",
      age: 26
    });

    console.log (person);

  } catch (error) {
    console.log("Error: ", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
