import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import resourceRoutes from './routes/resourceRoutes';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use('/api/resources', resourceRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Resource API');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
