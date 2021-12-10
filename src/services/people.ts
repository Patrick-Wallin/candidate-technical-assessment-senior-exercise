import client from '../database';
import { Person, PersonOrMessage } from '../models/people';
import { Message } from '../models/message';

export class PeopleStore {
  async index(): Promise<Person[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM people';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async show(id: number): Promise<PersonOrMessage> {
    let message: Message = { error: '' };

    try {
      const sql = 'SELECT id, name FROM people WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);
      conn.release();

      if (result.rowCount == 0) {
        message.error = `Could not find person based on id: ${id}`;
      }

      return message.error != undefined && message.error?.trim().length > 0
        ? message
        : result.rows[0];
    } catch (err) {
      message.error = `Error: ${err}`;
      return message;
    }
  }

  async create(p: Person): Promise<PersonOrMessage> {
    let message: Message = { error: '' };

    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO people (name) VALUES($1) RETURNING id, name';

      const result = await conn.query(sql, [p.name]);

      conn.release();

      if (result.rowCount == 0) {
        message.error = `${p.name} may already be existed in the table.`;
      }

      return message.error != undefined && message.error?.trim().length > 0
        ? message
        : result.rows[0];
    } catch (err) {
      message.error = `Unable to create person (${p.name}): ${err}`;
      return message;
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const sql = 'DELETE FROM people WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rowCount;
    } catch (err) {
      throw new Error(`Could not delete person ${id}. Error: ${err}`);
    }
  }

  async deleteAll(): Promise<number> {
    try {
      const sql = 'DELETE FROM people';
      const conn = await client.connect();

      const result = await conn.query(sql);

      conn.release();

      return result.rowCount;
    } catch (err) {
      throw new Error(`Could not delete any person. Error: ${err}`);
    }
  }
}
