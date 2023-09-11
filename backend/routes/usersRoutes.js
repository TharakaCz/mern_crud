import express from "express";
import sha1 from "js-sha1";
import { User } from "./../models/userModel.js";

const router = express.Router();

//Create a user
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.first_name ||
      !request.body.last_name ||
      !request.body.email ||
      !request.body.password
    ) {
      return response
        .status(400)
        .send({
          message:
            "Send all required fields: First Name, Last Name, Email, Password",
        });
    }
    const newUser = {
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      email: request.body.email,
      password: sha1(request.body.password),
      status: true,
    };

    const user = await User.create(newUser);

    return response.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Get users list
router.get("/", async (request, response) => {
  try {
    const users = await User.find({});
    return response.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Find a user
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);
    return response.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Update User
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.first_name ||
      !request.body.last_name ||
      !request.body.email
    ) {
      return response
        .status(400)
        .send({
          message: "Send all required fields: First Name, Last Name, Email",
        });
    }
    const { id } = request.params;
    const result = await User.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.send(404).json({ message: "User not found." });
    }
    return response.send(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Delete User
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return response.send(404).json({ message: "User not found." });
    }
    return response.send(200).json({ message: "User delete successfully." });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
