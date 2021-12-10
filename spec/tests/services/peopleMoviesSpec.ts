import { PeopleMoviesStore } from '../../../src/services/people_movies';
import { PeopleMovies, PeopleMoviesOrMessage } from '../../../src/models/people_movies';
import { PeopleStore } from '../../../src/services/people';
import { Person, PersonOrMessage } from '../../../src/models/people';
import { MoviesStore } from '../../../src/services/movies';
import { Movie, MovieOrMessage } from '../../../src/models/movies';

const movieStore = new MoviesStore();
const peopleStore = new PeopleStore();
const peopleMoviesStore = new PeopleMoviesStore();

describe("PeopleMovies Model", () => {
  let person: Person = { name: "Gaggle"};
  let movie: Movie = { name: "Back to the Future" };
  let peopleMovies: PeopleMovies = { person_id: 0, movie_id: 0 };
  let peopleMoviesId : number = 0;

  beforeAll(async() => {
    let result = await peopleStore.deleteAll();
    result = await movieStore.deleteAll();
    result = await peopleMoviesStore.deleteAll();

    const personOrMessage: PersonOrMessage = await peopleStore.create(person);
    person = (personOrMessage as Person);

    const movieOrMessage: MovieOrMessage = await movieStore.create(movie);
    movie = (movieOrMessage as Movie);

    peopleMovies.movie_id = movie.id;
    peopleMovies.person_id = person.id;
  });

  afterAll(async() => {
    let result = await peopleStore.deleteAll();
    result = await movieStore.deleteAll();
    result = await peopleMoviesStore.deleteAll();
  });

  it('should have an index method', () => {
    expect(peopleMoviesStore.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(peopleMoviesStore.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(peopleMoviesStore.delete).toBeDefined();
  });

  it('should have a deleteAll method', () => {
    expect(peopleMoviesStore.deleteAll).toBeDefined();
  });

  it('should have a showFullData method', () => {
    expect(peopleMoviesStore.showFullData).toBeDefined();
  });

  it('index method should return no record at a start', async () => {
    const result = await peopleMoviesStore.index();
    expect(result).toHaveSize(0);
  });

  it('create method should add a person/movie', async () => {
    const resultFromCreate: PeopleMoviesOrMessage = await peopleMoviesStore.create(peopleMovies);
    expect((resultFromCreate as PeopleMovies).id).toBeGreaterThan(1);
    peopleMovies = (resultFromCreate as PeopleMovies);
  });

  it('index method should return one record after creating people/movie', async () => {
    const result = await peopleMoviesStore.index();
    expect(result).toHaveSize(1);
  });
});