import express from "express";
import connectDB  from "./config/db.js";
import dotenv from "dotenv";
import cors from 'cors';
import authRoutes from "../Backend/routes/authRoutes.js";
import subscriptionRoutes from "../Backend/routes/subscriptionRoutes.js";
import courseRoutes from "../Backend/routes/courseRoutes.js";
import instructorRoutes from "../Backend/routes/instructorRoutes.js";

const app = express();
connectDB();
dotenv.config();

app.use(cors());

app.use(express.json());
app.use(authRoutes);
app.use(subscriptionRoutes);
app.use(courseRoutes);
app.use(instructorRoutes);




const PORT =process.env.PORT || 9000;
app.listen(PORT,()=>
{
    console.log(`Server running on ${process.env.PORT}` )
}) 

