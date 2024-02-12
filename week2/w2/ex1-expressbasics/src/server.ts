// server.ts
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import log4js from 'log4js';
import fs from 'fs';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Read persons data from the JSON file
const personsData = fs.readFileSync('persons.json', 'utf8');
let persons = JSON.parse(personsData);

// GET all persons
app.get('/persons', (req: Request, res: Response) => {
  res.status(200).json(persons);
});

// GET person by id
app.get('/persons/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const person = persons.find((p: { id: number }) => p.id === parseInt(id));

  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).send('Person not found');
  }
});

// POST create new person
app.post('/persons', (req: Request, res: Response) => {
  const newPerson = req.body;
  // Assign a new id
  newPerson.id = persons.length + 1;
  persons.push(newPerson);

  // Update the persons.json file
  fs.writeFileSync('persons.json', JSON.stringify(persons, null, 2), 'utf8');

  res.status(201).json(newPerson);
});

// PUT update person by id
app.put('/persons/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedPerson = req.body;
  const index = persons.findIndex((p: { id: number }) => p.id === parseInt(id));

  if (index !== -1) {
    persons[index] = { ...persons[index], ...updatedPerson };

    // Update the persons.json file
    fs.writeFileSync('persons.json', JSON.stringify(persons, null, 2), 'utf8');

    res.status(200).json(persons[index]);
  } else {
    res.status(404).send('Person not found');
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
