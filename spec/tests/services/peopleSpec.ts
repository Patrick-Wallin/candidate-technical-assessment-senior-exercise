import { PeopleStore } from '../../../src/services/people';
import { Person, PersonOrMessage } from '../../../src/models/people';

const store = new PeopleStore();

describe("People Model", () => {
  const person: Person = { name: "Gaggle"};
  
  let personId : number = 0;

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
    expect(result).toEqual(jasmine.objectContaining({ error: 'Could not find person based on id: 1'}));
  });

  it('create method should add a person', async () => {
    const resultFromCreate: PersonOrMessage = await store.create(person);
    expect((resultFromCreate as Person).id).toBeGreaterThanOrEqual(1);
    personId = (resultFromCreate as Person).id || 0;
  });

  it('index method should return one record after creating person', async () => {
    const result = await store.index();
    expect(result).toHaveSize(1);
  });

  it('show method should return one record after creating person', async () => {
    const result = await store.show(personId);
    expect(result).toEqual({
      id: personId,
      name: person.name
    });    
  });

  it('delete method should remove person', async () => {
    const result = await store.delete(personId);
    expect(result).toEqual(1);
  });

  it('deleteAll method should remove all records', async () => {
    const result = await store.deleteAll();
    expect(result).toEqual(0); // Since there is no record to be deleted at this time.
  });

});