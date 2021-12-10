import express from 'express';
import peopleRoutes from './people';
import moviesRoutes from './movies';
import peopleMoviesRoutes from './people_movies';
import searchRoutes from './search';

const allRoutes = (app: express.Application) => {
  peopleRoutes(app);
  moviesRoutes(app);
  peopleMoviesRoutes(app);
  searchRoutes(app);
};

export default allRoutes;
