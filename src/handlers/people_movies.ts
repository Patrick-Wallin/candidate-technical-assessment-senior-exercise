import express, { Request, Response } from 'express';
import { Message } from '../models/message';
import { PeopleMovies } from '../models/people_movies';
import { PeopleMoviesStore } from '../services/people_movies';

const peopleMoviesStore = new PeopleMoviesStore();

const index = async (_req: Request, res: Response) => {
  try {
    const people = await peopleMoviesStore.index();
    res.json(people);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createPeopleMovies = async (req: Request, res: Response) => {
  try {
    if (!req.body.person_id || !req.body.movie_id) {
      res.status(400);
      const message: Message = {
        error: 'person_id and movie_id are required.',
      };
      res.json(message);
    } else {
      const personMovie: PeopleMovies = {
        person_id: req.body.person_id,
        movie_id: req.body.movie_id,
      };
      const result = await peopleMoviesStore.create(personMovie);
      if ((result as Message).error == undefined) {
        res.status(200);
      } else {
        res.status(404);
      }
      res.json(result);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const peopleMoviesRoutes = (app: express.Application) => {
  app.get('/api/peoplemovies', index);
  app.post('/api/peoplemovies', createPeopleMovies);
};

export default peopleMoviesRoutes;
