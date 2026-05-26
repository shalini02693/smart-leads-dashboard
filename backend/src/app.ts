import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';
import exportRoutes from './routes/export.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('API Running');
});

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/export', exportRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route Not Found',
  });
});

app.use(errorHandler);

export default app;