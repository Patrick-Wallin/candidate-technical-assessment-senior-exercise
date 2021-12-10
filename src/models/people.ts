import { Message } from './message';

export type Person = {
  id?: number;
  name?: string;
};

export type PersonOrMessage = Person | Message;
