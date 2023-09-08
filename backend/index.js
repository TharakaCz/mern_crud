import express, { request, response } from "express";
import { port, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import sha1 from "js-sha1";
import { User } from "./models/userModel.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post('/create', async (request, response) => {
  try {
    if(!request.body.first_name || !request.body.last_name || !request.body.email || !request.body.password){
      return response.status(400).send({message: 'Send all required fields: First Name, Last Name, Email, Password'});
    }
    const newUser = {
      first_name: request.body.first_name,
      last_name:  request.body.last_name,
      email: request.body.email,
      password: sha1(request.body.password),
      status: true,
    }

    const user = await User.create(newUser);

    return response.status(200).send(user);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({message: error.message});
  }
});


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to the database.");
    app.listen(port, () => {
        console.log(`App listen to port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
