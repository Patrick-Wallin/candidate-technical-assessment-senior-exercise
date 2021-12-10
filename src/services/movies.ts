import client from '../database';
import { Message } from '../models/message';
import { Movie, MovieOrMessage } from '../models/movies';

export class MoviesStore {
  async index(): Promise<Movie[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM movies';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async create(m: Movie): Promise<MovieOrMessage> {
    let message: Message = { error: '' };

    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO movies (name) VALUES($1) RETURNING id, name';

      const result = await conn.query(sql, [m.name]);

      conn.release();

      if (result.rowCount == 0) {
        message.error = `${m.name} may already be existed in the table.`;
      }

      return message.error != undefined && message.error?.trim().length > 0
        ? message
        : result.rows[0];
    } catch (err) {
      message.error = `Unable to create movie (${m.name}): ${err}`;
      return message;
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const sql = 'DELETE FROM movies WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rowCount;
    } catch (err) {
      throw new Error(`Could not delete movie ${id}. Error: ${err}`);
    }
  }

  async deleteAll(): Promise<number> {
    try {
      const sql = 'DELETE FROM movies';
      const conn = await client.connect();

      const result = await conn.query(sql);

      conn.release();

      return result.rowCount;
    } catch (err) {
      throw new Error(`Could not delete any movie. Error: ${err}`);
    }
  }

  async show(id: number): Promise<MovieOrMessage> {
    try {
      let message: Message = { error: '' };

      const sql = 'SELECT id, name FROM movies WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);
      conn.release();

      if (result.rowCount == 0) {
        message.error = `Could not find movie based on id: ${id}`;
      }

      return message.error != undefined && message.error?.trim().length > 0
        ? message
        : result.rows[0];
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}
