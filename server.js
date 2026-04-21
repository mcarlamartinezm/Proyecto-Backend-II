import app from "./src/app.js";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";

dotenv.config();

const PORT = process.loadEnvFile.PORT || 8080;

app.listen (PORT, () => {
    console.log (`Servidor corriendo en puesto ${PORT}`);
});


connectDB();