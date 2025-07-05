import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDatabase from "./config/database.js";

// Initialize express
const app = express();

// Connect to database
await connectDatabase()

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (request, response) => {
  response.send("API Working");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port.`);
})