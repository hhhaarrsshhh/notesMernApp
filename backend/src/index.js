import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import dotenv from 'dotenv';
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app=express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
})); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(rateLimiter)


app.use("/api/notes",notesRoutes);

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("Server is running on port ",PORT);
})// first connect db thn only can start server

})


// app.get("/api/notes",(req,res)=>{
//     res.send("Hello World");
// })

// app.post("/api/notes",(req,res)=>{
//     res.status(201).json({message:"Note created sucessfully"})

// })

// app.put("/api/notes/:id",(req,res)=>{
//     res.status(200).json({message:"Note updated sucessfully"})
// }) 

// app.delete("/api/notes/:id",(req,res)=>{
//     res.status(200).json({message:"Note deleted sucessfully"})
// })

