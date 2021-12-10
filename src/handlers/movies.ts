import express, { Request, Response } from 'express';
import { Message } from '../models/message';
import { Movie, MovieOrMessage } from '../models/movies';
import { MoviesStore } from '../services/movies';

const moviesStore = new MoviesStore();

const index = async (_req: Request, res: Response) => {
  try {
    const movies = await moviesStore.index();
    res.json(movies);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const showMovie = async (req: Request, res: Response) => {
  try {
    const movieOrMessage = await moviesStore.show(parseInt(req.params.id));
    if ((movieOrMessage as Movie).id == undefined) {
      res.status(404);
    } else {
      res.status(200);
    }
    res.json(movieOrMessage);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createMovie = async (req: Request, res: Response) => {
  try {
    if (!req.body.name) {
      res.status(400);
      const message: Message = {
        error: 'name is required.',
      };
      res.json(message);
    } else {
      const movie: Movie = {
        name: req.body.name,
      };

      const newMovie: MovieOrMessage = await moviesStore.create(movie);
      if ((newMovie as Movie).id == undefined) {
        res.status(404);
      } else {
        res.status(200);
      }
      res.json(newMovie);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const moviesRoutes = (app: express.Application) => {
  app.get('/api/movies', index);
  app.get('/api/movies/:id', showMovie);
  app.post('/api/movie', createMovie);
};

export default moviesRoutes;
