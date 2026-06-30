import e from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.middleware";

const app = e();

dotenv.config();

const PORT = process.env.NODE_ENV === "production" ? process.env.PORT : "3000";

app.use(cors());

// parsing
app.use(e.json());
app.use(e.urlencoded());

// adding helmet headers
app.use(helmet);

// TODO: routes

// TODO: Error Handler Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`the server is running on port: ${PORT}`);
});
