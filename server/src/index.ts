import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import jobs from './routes/jobs';
import carriers from './routes/carriers';
import quotes from './routes/quotes';
import messages from './routes/messages';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobs);
app.use('/api/carriers', carriers);
app.use('/api/quotes', quotes);
app.use('/api/messages', messages);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
