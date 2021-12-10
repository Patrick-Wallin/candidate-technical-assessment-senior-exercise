import app from '../../../src/server';
import supertest from 'supertest';
import { PeopleStore } from '../../../src/services/people';
import { Person } from '../../../src/models/people';

const store = new PeopleStore();
const request = supertest(app);

describe('Testing People - API', function () {
  const person: Person = { name: "Patrick" };

  let personId : number = 0;

  beforeAll(async() => {
    const result = await store.deleteAll();
  });

  afterAll(async() => {
    const result = await store.deleteAll();
  });
  
  it('respond with GET as /api/people - status 200', async () => {
    const response = await request.get('/api/people');
    expect(response.status).toBe(200);    
  });

  it('respond with GET as /api/person/1 - status 404 (not found)', async () => {
    const response = await request.get('/api/people/1');
    expect(response.status).toBe(404);    
  });

  it('Create person and respond with name', async () => {
    const response = await request.post('/api/person').send({name : person.name });
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toBeTruthy();
    expect(response.status).toBe(200);    
    expect(response.body.name).toEqual(person.name);
    personId = response.body.id;
  });

  it('Create person - Expect to be failed since it was already in the table', async () => {
    const response = await request.post('/api/person').send({name : person.name});    
    expect(response.status).toBe(404);    
  });

  it('respond with get as /api/people/{id} - status 200 since we have it now.', async () => {
    const response = await request.get(`/api/people/${personId}`);
    expect(response.status).toBe(200);    
  });

});