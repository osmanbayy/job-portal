import "./config/instrument.js"
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDatabase from "./config/database.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import company_routes from "./routes/company_routes.js"

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
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhooks);
app.use("/api/company", company_routes);

// Port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port.`);
})