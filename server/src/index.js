import app from "./app.js";
import dotenv from "dotenv";
import ConnectDB from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

// Mock user data
const mockUsers = {
  "user@example.com": {
    password: "password123", // In real apps, never store plain text passwords!
    name: "Mock User",
    id: "mock-user-id-123"
  }
};

// Simple mock authentication middleware
app.use((req, res, next) => {
  // Only mock if MongoDB isn't connected
  if (!global.mongoConnected) {
    if (req.path === '/login' && req.method === 'POST') {
      const { email, password } = req.body;
      const user = mockUsers[email];
      
      if (user && user.password === password) {
        return res.json({
          success: true,
          user: {
            email,
            name: user.name,
            id: user.id
          },
          message: "Mock login successful (MongoDB not connected)"
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }
    }
  }
  next();
});

const startServer = async () => {
    try {
        await ConnectDB();
        global.mongoConnected = true; // Flag to indicate MongoDB is connected

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log("MongoDB connection failed, running with mock authentication");
        global.mongoConnected = false; // Flag to indicate MongoDB is not connected
        
        app.listen(PORT, () => {
            console.log(`Server running in mock mode on port ${PORT}`);
        });
    }
};

startServer();
