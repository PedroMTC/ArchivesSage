// index.js

import express from 'express';
import userRoutes from './routes/users.js';
import cors from 'cors';
import sendMessage from './utils/sendMessage.js';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.post('/send-message', sendMessage);

app.use('/', userRoutes);

app.listen(8800, () => {
  console.log('Server listening at http://localhost:8800');
});

