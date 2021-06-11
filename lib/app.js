import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import motorcycleController from './controllers/motorcycles';
import pokemonController from './controllers/pokemon.js';

const app = express();

app.use(express.json());
app.use(motorcycleController, pokemonController);
// app.use(pokemonController);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
