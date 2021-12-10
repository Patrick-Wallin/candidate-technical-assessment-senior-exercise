import { MoviesStore } from '../../../src/services/movies';
import { Movie, MovieOrMessage } from '../../../src/models/movies';

const store = new MoviesStore()

describe("Movies Model", () => {
  const movie: Movie = { name: "Back to the Future"};
  
  let movieId : number = 0;

  beforeAll(async() => {
    const result = await store.deleteAll();
  });

  afterAll(async() => {
    const result = await store.deleteAll();
  });

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('should have a deleteAll method', () => {
    expect(store.deleteAll).toBeDefined();
  });

  it('index method should return no record at a start', async () => {
    const result = await store.index();
    expect(result).toHaveSize(0);
  });

  it('show method should return an error based on id: 1 (no record at a start)', async () => {
    const result = await store.show(1);
    expect(result).toEqual(jasmine.objectContaining({ error: 'Could not find movie based on id: 1'}));
  });

  it('create method should add a movie', async () => {
    const resultFromCreate: MovieOrMessage = await store.create(movie);
    expect((resultFromCreate as Movie).id).toBeGreaterThanOrEqual(1);
    movieId = (resultFromCreate as Movie).id || 0;
  });

  it('index method should return one record after creating movie', async () => {
    const result = await store.index();
    expect(result).toHaveSize(1);
  });

  it('show method should return one record after creating movie', async () => {
    const result = await store.show(movieId);
    expect(result).toEqual({
      id: movieId,
      name: movie.name
    });    
  });

  it('delete method should remove movie', async () => {
    const result = await store.delete(movieId);
    expect(result).toEqual(1);
  });

  it('deleteAll method should remove all records', async () => {
    const result = await store.deleteAll();
    expect(result).toEqual(0); // Since there is no record to be deleted at this time.
  });

});