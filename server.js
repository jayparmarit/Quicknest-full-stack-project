import express from "express";
import connectDB from "./config/db.js";

import dotenv from "dotenv";

dotenv.config({ path: "./.env" });


const app = express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json("hello from server")
}) 


async function startServer(){
    try{
     await connectDB();

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();

