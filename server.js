import express from "express";
import rootRouter from "./src/routes/root.router.js";

const app = express();

app.use(express.json());
app.use("/api",rootRouter);


const PORT = 3069;

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})