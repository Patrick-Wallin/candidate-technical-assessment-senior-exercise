import { Message } from './message';

export type PeopleMovies = {
  id?: number;
  person_id?: number;
  movie_id?: number;
};

export type SearchData = {
  person_id?: number;
  person_name?: string;
};

export type SearchResult = {
  person_id: number;
  person_name: string;
  movie_id: number;
  movie_name: string;
};

export type SearchResultOrMessage = SearchResult | Message;

export type PeopleMoviesOrMessage = PeopleMovies | Message;
