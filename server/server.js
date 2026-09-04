import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedDatabase } from './seed/seedRunner.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'KrishiRoute Agricultural Transaction & Fulfilment Engine',
    version: '2.4.0-enterprise',
    environment: 'production-ready',
    timestamp: new Date().toISOString()
  });
});

// Boot server
async function startServer() {
  await connectDB();
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 KrishiRoute API Server running on port ${PORT}`);
    console.log(`📡 URL: http://localhost:${PORT}/api/health`);
    console.log(`🌾 Enterprise Agri-Supply Chain Optimization Engine`);
    console.log(`====================================================`);
  });
}

startServer();
