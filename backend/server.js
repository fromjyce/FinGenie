// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/chat', chatRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('🧞‍♂️ FinGenie backend is running!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
