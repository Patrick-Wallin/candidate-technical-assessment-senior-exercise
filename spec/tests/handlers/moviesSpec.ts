import app from '../../../src/server';
import supertest from 'supertest';
import { MoviesStore } from '../../../src/services/movies';
import { Movie } from '../../../src/models/movies';

const store = new MoviesStore();
const request = supertest(app);

describe('Testing Movies - API', function () {
  const movie: Movie = { name: "Back to the future" };

  let movieId : number = 0;

  beforeAll(async() => {
    const result = await store.deleteAll();
  });

  afterAll(async() => {
    const result = await store.deleteAll();
  });
  
  it('respond with GET as /api/movies - status 200', async () => {
    const response = await request.get('/api/movies');
    expect(response.status).toBe(200);    
  });

  it('respond with GET as /api/movies/1 - status 404 (not found)', async () => {
    const response = await request.get('/api/movies/1');
    expect(response.status).toBe(404);    
  });

  it('Create movie and respond with name', async () => {
    const response = await request.post('/api/movie').send({name : movie.name });
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toBeTruthy();
    expect(response.status).toBe(200);    
    expect(response.body.name).toEqual(movie.name);
    movieId = response.body.id;
  });

  it('Create movie - Expect to be failed since it was already in the table', async () => {
    const response = await request.post('/api/movie').send({name : movie.name});    
    expect(response.status).toBe(404);    
  });

  it('respond with get as /api/movies/{id} - status 200 since we have it now.', async () => {
    const response = await request.get(`/api/movies/${movieId}`);
    expect(response.status).toBe(200);    
  });

});