import express, { Request, Response } from 'express';
import { Message } from '../models/message';
import { Person, PersonOrMessage } from '../models/people';
import { PeopleStore } from '../services/people';

const peopleStore = new PeopleStore();

const index = async (_req: Request, res: Response) => {
  try {
    const people = await peopleStore.index();
    res.status(200);
    res.json(people);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const showPerson = async (req: Request, res: Response) => {
  try {
    const personOrMessage: PersonOrMessage = await peopleStore.show(
      parseInt(req.params.id)
    );
    if ((personOrMessage as Person).id == undefined) {
      res.status(404);
    } else {
      res.status(200);
    }
    res.json(personOrMessage);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createPerson = async (req: Request, res: Response) => {
  try {
    if (!req.body.name) {
      res.status(400);
      const message: Message = {
        error: 'name is required.',
      };
      res.json(message);
    } else {
      const person: Person = {
        name: req.body.name,
      };

      const newPerson: PersonOrMessage = await peopleStore.create(person);
      if ((newPerson as Person).id == undefined) {
        res.status(404);
      } else {
        res.status(200);
      }
      res.json(newPerson);
    }
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const peopleRoutes = (app: express.Application) => {
  app.get('/api/people', index);
  app.get('/api/people/:id', showPerson);
  app.post('/api/person', createPerson);
};

export default peopleRoutes;
