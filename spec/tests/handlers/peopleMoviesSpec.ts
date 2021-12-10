import app from '../../../src/server';
import supertest from 'supertest';
import { PeopleStore } from '../../../src/services/people';
import { MoviesStore } from '../../../src/services/movies';
import { Person, PersonOrMessage } from '../../../src/models/people';
import { Movie, MovieOrMessage } from '../../../src/models/movies';

const peopleStore = new PeopleStore();
const moviesStore = new MoviesStore();

const request = supertest(app);

describe('Testing People-Movies - API', function () {
    let person1: Person = { 
        id: 0, name: "Bill Gates" 
    };
    let person2: Person = { 
        id: 0, name: "Steve Jobs" 
    };
    let movie1: Movie = { 
        id: 0, name: "Star Wars" 
    };
    let movie2: Movie = { 
        id: 0, name: "Back to the Future" 
    };
      
  beforeAll(async() => {
      let result = await peopleStore.deleteAll();
      result = await moviesStore.deleteAll();

      const newPerson1: PersonOrMessage = await peopleStore.create(person1);
      person1 = (newPerson1 as Person);

      const newPerson2: PersonOrMessage = await peopleStore.create(person2);
      person2 = (newPerson2 as Person);

      const newMovie1: MovieOrMessage = await moviesStore.create(movie1);
      movie1 = (newMovie1 as Movie);

      const newMovie2: MovieOrMessage = await moviesStore.create(movie2);
      movie2 = (newMovie2 as Movie);
  });

  afterAll(async() => {
    let result = await peopleStore.deleteAll();
    result = await moviesStore.deleteAll();
});
  
  it('respond with GET as /api/peoplemovies - status 200 and no record', async () => {
    const response = await request.get('/api/peoplemovies');
    expect(response.status).toBe(200);    
    expect(response.body).toHaveSize(0);
  });

  it('Create people-movies record (person1,movie1) and respond with one record', async () => {    
    const response = await request.post('/api/peoplemovies').send( 
        { person_id : person1.id, movie_id: movie1.id });
    expect(response.body.id).toBeTruthy();
    expect(response.body.person_id).toBeTruthy();
    expect(response.body.movie_id).toBeTruthy();
    expect(response.status).toBe(200);    
    expect(response.body.person_id).toEqual(person1.id);
    expect(response.body.movie_id).toEqual(movie1.id);
  });

  it('Create people-movies record (person2,movie2) and respond with one record', async () => {    
    const response = await request.post('/api/peoplemovies').send( 
        { person_id : person2.id, movie_id: movie2.id });
    expect(response.body.id).toBeTruthy();
    expect(response.body.person_id).toBeTruthy();
    expect(response.body.movie_id).toBeTruthy();
    expect(response.status).toBe(200);    
    expect(response.body.person_id).toEqual(person2.id);
    expect(response.body.movie_id).toEqual(movie2.id);
  });

  it('respond with GET as /api/peoplemovies - status 200 and 2 records', async () => {
    const response = await request.get('/api/peoplemovies');
    expect(response.status).toBe(200);    
    expect(response.body).toHaveSize(2);
  });

  it('Create people-movies record (person2,movie2) and expect to be failed since it was already in the table', async () => {    
    const response = await request.post('/api/peoplemovies').send( 
        { person_id : person2.id, movie_id: movie2.id });
    expect(response.status).toBe(404);    
  });
});