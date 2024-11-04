// Import required modules
import express from "express";
import config from "config";
import userRouter from "./controllers/userController.js";
import adminRouter from "./controllers/adminController.js";
import cors from "cors";

import path from "path";
import { fileURLToPath } from "url";

// DB Connect in Config Folder

import "./utils/dbConnect.js";
import authMiddleware from "./middleware/users/authMiddleware.js";
import publicUserRouter from "./controllers/public/register.js";

// Create an instance of Express
const app = express();
app.use(cors());
const PORT = process.env.PORT || config.get("PORT");

// Middleware - Parse incoming requests as JSON
app.use(express.json());


// API routes
app.use("/public", publicUserRouter);
app.use("/user", authMiddleware, userRouter);
app.use("/admin", authMiddleware, adminRouter);



// // Handle 404 errors - Route not found
app.use((req, res, next) => {
  res.status(404).send("404 - Route Not Found");
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("500 - Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT 🚀 ${PORT}`);
});
