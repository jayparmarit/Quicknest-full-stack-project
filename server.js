import express from "express";
import connectDB from "./config/db.js";
import HttpsError from "./middleware/HttpError.js";
import userRoutes from "./routes/userRoutes.js"

import dotenv from "dotenv";

dotenv.config({ path: "./.env" });


const app = express();

app.use(express.json())

app.use("/user",userRoutes)

app.get("/",(req,res)=>{
    res.status(200).json("hello from server")
}) 

app.use((req, res, next)=>{
  return next(new HttpsError("requested routes not found",404))
});

app.use((error, req, res, next)=>{
  if(res.headersSent){
    return next(error);
  }

  res.status(error.statusCode || 500).json(error.message || "internal server error")
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

