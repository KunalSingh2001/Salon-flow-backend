import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.use(errorHandler);

export default app;
