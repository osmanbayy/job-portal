import "./config/instrument.js"
import express from "express";
import cors from "cors";
import "dotenv/config";
import connect_database from "./config/database.js";
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./controllers/webhooks.js";
import company_routes from "./routes/company_routes.js"
import job_routes from "./routes/job_routes.js"
import user_routes from "./routes/user_routes.js";
import connect_cloudinary from "./config/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";

// Initialize express
const app = express();

// Connect to database
await connect_database()
await connect_cloudinary();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.get("/", (request, response) => {
  response.send("API Working");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post("/webhooks", clerkWebhooks);
app.use("/api/company", company_routes);
app.use("/api/jobs", job_routes);
app.use("/api/users", user_routes);

// Port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port.`);
})