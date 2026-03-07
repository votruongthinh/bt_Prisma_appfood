import express from "express";
import rootRouter from "./src/routes/root.router.js";
import {appError} from "./src/common/helpers/app-error.helper.js";
const app = express();

app.use(express.json());
app.use("/api",rootRouter);
app.use(appError)
app.get("/test", (req,res)=>{
    res.send("SERVER OK")
})
const PORT = 3069;

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})