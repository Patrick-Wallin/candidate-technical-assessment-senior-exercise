import express, { Request, Response } from 'express';
import { Message } from '../models/message';
import { SearchData } from '../models/people_movies';
import { PeopleMoviesStore } from '../services/people_movies';

const peopleMoviesStore = new PeopleMoviesStore();

const getFullDataBasedOnPersonNameOrId = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.body.person_id && !req.body.person_name) {
      res.status(400);
      const message: Message = {
        error: 'person_id or movie_name is required for getting data.',
      };
      res.json(message);
    } else {
      if (req.body.person_id && req.body.person_name) {
        res.status(400);
        const message: Message = {
          error: 'Please enter person_id or person_name, not both.',
        };
        res.json(message);
      } else {
        const searchData: SearchData = {
          person_id: !req.body.person_id ? undefined : req.body.person_id,
          person_name: !req.body.person_name ? undefined : req.body.person_name,
        };

        const results = await peopleMoviesStore.showFullData(searchData);
        res.json(results);
      }
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const searchRoutes = (app: express.Application) => {
  app.post('/api/search', getFullDataBasedOnPersonNameOrId);
};

export default searchRoutes;
