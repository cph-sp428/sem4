import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3001; // Choose any available port

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define a POST endpoint /users
app.post('/users', (req: Request, res: Response) => {
    let data = req.body;
    console.log(data);
    res.send('Data received successfully!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
