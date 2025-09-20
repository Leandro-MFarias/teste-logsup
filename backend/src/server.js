import express from "express";
import userRoutes from "./routes/userRouter.js"

const PORT = 3333;

const app = express();
app.use(express.json());

app.use("/api", userRoutes)

app.listen(PORT, console.log("Rodando na porta: ", PORT));
