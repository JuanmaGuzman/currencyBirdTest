import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

// const dbURI = `mongodb://${process.env.MDB_USERNAME}:${process.env.MDB_PASSWORD}@database:27017/currencyBird`;

const dbURI = "mongodb://127.0.0.1:27017/currencyBird";

console.log("Using database URI:", dbURI); 

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.error(err));