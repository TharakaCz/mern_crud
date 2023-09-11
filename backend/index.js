import express from "express";
import { port, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import usersRoutes from "./routes/usersRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

//calling user router
app.use("/users", usersRoutes);

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
