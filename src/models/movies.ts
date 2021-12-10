import { Message } from './message';

export type Movie = {
  id?: number;
  name: string;
};

export type MovieOrMessage = Movie | Message;
