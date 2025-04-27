import app from "./app.js";
import dotenv from "dotenv";
import ConnectDB from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await ConnectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        process.exit(1);
    }
};

startServer();
