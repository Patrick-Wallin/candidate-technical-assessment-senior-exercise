import client from '../database';
import { Message } from '../models/message';
import {
  PeopleMovies,
  SearchData,
  SearchResult,
  PeopleMoviesOrMessage,
} from '../models/people_movies';

export class PeopleMoviesStore {
  async index(): Promise<PeopleMovies[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM people_movies';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }

  async create(personMovie: PeopleMovies): Promise<PeopleMoviesOrMessage> {
    let message: Message = { error: '' };

    try {
      let personMovieId: Number[] = new Array();

      const conn = await client.connect();

      const sql =
        'INSERT INTO people_movies (person_id, movie_id) VALUES($1, $2) returning id, person_id, movie_id';

      const result = await conn.query(sql, [
        personMovie.person_id,
        personMovie.movie_id,
      ]);

      conn.release();

      if (result.rowCount == 0) {
        message.error =
          JSON.stringify(personMovie) + ` may already be existed in the table.`;
      }

      return message.error != undefined && message.error?.trim().length > 0
        ? message
        : result.rows[0];
    } catch (err) {
      message.error =
        `Unable to create record for both movie and person (` +
        JSON.stringify(personMovie) +
        `): ${err}`;
      return message;
    }
  }

  async delete(id: number): Promise<number> {
    try {
      const sql = 'DELETE FROM people_movies WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rowCount;
    } catch (err) {
      throw new Error(`Could not delete people_movies ${id}. Error: ${err}`);
    }
  }

  async deleteAll(): Promise<number> {
    try {
      const sql = 'DELETE FROM people_movies';
      const conn = await client.connect();

      const result = await conn.query(sql);

      conn.release();

      return result.rowCount;
    } catch (err) {
      throw new Error(
        `Could not delete any record in people_movies. Error: ${err}`
      );
    }
  }

  async showFullData(searchData: SearchData): Promise<SearchResult[]> {
    try {
      let message: Message = { error: '' };

      let sql: string =
        'SELECT people.id AS person_id, people.name AS person_name, movies.id AS movie_id, movies.name AS movie_name \
            FROM people_movies \
            INNER JOIN people ON people.id = people_movies.person_id \
            INNER JOIN movies ON movies.id = people_movies.movie_id WHERE';

      if (searchData.person_id != undefined) {
        sql = sql.concat(` people.id = ${searchData.person_id}`);
      } else {
        sql = sql.concat(
          ` LOWER(people.name) LIKE LOWER('%${searchData.person_name}%')`
        );
      }

      const conn = await client.connect();

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  }
}
