import { app } from "./App.js";
import connectToDb from "./db/index.js";
import dotenv from 'dotenv'

dotenv.config({
  path : './.env'
})

connectToDb()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`App is running on Port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect MongoDb", error);
  });
