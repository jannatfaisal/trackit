import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Other options you might want:
            // serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            // maxPoolSize: 10, // Maximum number of sockets in the connection pool
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

export default ConnectDB;