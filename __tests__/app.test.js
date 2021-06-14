import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Motorcycle from '../lib/models/Motorcycle';
import Pokemon from '../lib/models/Pokemon';
import Cat from '../lib/models/Cat';
import Person from '../lib/models/Person';
import City from '../lib/models/City';
describe('/api/v1/motorcycles', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a motorcycle via post', async () => {
    const res = await request(app)
      .post('/api/v1/motorcycles')
      .send({ make: 'Kawasaki', model: 'Ninja-650', horsepower: 67 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: '1', make: 'Kawasaki', model: 'Ninja-650', horsepower: 67 });
  });
  it('gets a single motorcycle specified by id from db', async () => {
    const motorcycle = await Motorcycle.insert({ make: 'Kawasaki', model: 'Ninja-650', horsepower: 67 });
    
    const res = await request(app)
      .get(`/api/v1/motorcycles/${motorcycle.id}`);
      
    expect(res.status).toBe(200);
    expect(res.body).toEqual(motorcycle);
  });

  it('gets all motorcycles from db', async () => {
    const ninja = await  Motorcycle.insert({ make: 'Kawasaki', model: 'Ninja-650', horsepower: 67 });
    const cbr = await  Motorcycle.insert({ make: 'Honda', model: 'CBR-650R', horsepower: 90 });
    const sv = await  Motorcycle.insert({ make: 'Suzuki', model: 'SV-650', horsepower: 75 });

    const res = await request(app)
      .get('/api/v1/motorcycles');
      
    expect(res.status).toBe(200);
    expect(res.body).toEqual([ninja, cbr, sv]);
  });
  it('updates a motorcycle in the db', async () => {
    const cbr = await  Motorcycle.insert({ make: 'Honda', model: 'CBR-650R', horsepower: 90 });
    cbr.horsepower = 1000;
    
    const res = await request(app)
      .put(`/api/v1/motorcycles/${cbr.id}`)
      .send(cbr);
    
    expect(res.status).toBe(200);
    expect(res.body).toEqual(cbr);
  });
  it('deletes a motorcycle from the db', async () => {
    const ninja = await  Motorcycle.insert({ make: 'Kawasaki', model: 'Ninja-650', horsepower: 67 });
    await  Motorcycle.insert({ make: 'Honda', model: 'CBR-650R', horsepower: 90 });

    const res = await request(app)
      .delete(`/api/v1/motorcycles/${ninja.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(ninja);
    expect(res.body).not.toEqual(expect.arrayContaining([ninja]));
  });
});

describe('/api/v1/pokemon,', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('inserts a pokemon in to /api/v1/pokemon', async () => {
    const pokemon = {
      id: '1',
      name: 'pikachu',
      typeOne: 'electric',
      typeTwo: 'NA',
      attack: 55
    };

    const res = await request(app)
      .post('/api/v1/pokemon')
      .send(pokemon);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(pokemon);
  });

  it('gets a pokemon from /api/v1/pokemon/:id', async () => {
    const pokemon = await Pokemon.insert({ name: 'pikachu', typeOne: 'electric', typeTwo: 'NA', attack: 55 });
    
    const res = await request(app)
      .get(`/api/v1/pokemon/${pokemon.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(pokemon);
  });

  it('gets all pokemon from /api/v1/pokemon', async () => {
    const pika = { name: 'pikachu', typeOne: 'electric', typeTwo: 'NA', attack: 55 };
    const char = { name: 'charmeleon', typeOne: 'fire', typeTwo: 'NA', attack: 64 };
    const bulba = { name: 'bulbasaur', typeOne: 'grass', typeTwo: 'poison', attack: 49 };
    const pokemon = [pika, char, bulba];

    const expected = await Promise.all(
      pokemon.map(poke => {
        return  Pokemon.insert(poke);
      }));

    const res = await request(app)
      .get('/api/v1/pokemon');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining(expected));
  });

  it('updates a pokemon at /api/v1/pokemon/:id', async () => {
    const pokemon = await Pokemon.insert({ name: 'pikachu', typeOne: 'electric', typeTwo: 'NA', attack: 55 });
    pokemon.attack = 5000;
    pokemon.typeTwo = 'dragon';

    const res = await request(app)
      .put(`/api/v1/pokemon/${pokemon.id}`)
      .send(pokemon);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(pokemon);
  });
  it('gets a removes a pokemon from /api/v1/pokemon:id', async () => {
    const char = await Pokemon.insert({ name: 'charmeleon', typeOne: 'fire', typeTwo: 'NA', attack: 64 });
    await Pokemon.insert({ name: 'bulbasaur', typeOne: 'grass', typeTwo: 'poison', attack: 49 });
    
    const res = await request(app)
      .delete(`/api/v1/pokemon/${char.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(char);
    expect(res.body).not.toEqual(expect.arrayContaining([char]));
  });
});

describe('/api/v1/pokemon', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const cats = [{
    name: 'Felix',
    type: 'Tuxedo',
    lives: 3,
    isSidekick: false
  },
  {
    name: 'Garfield',
    type: 'Orange Tabby',
    lives: 7,
    isSidekick: false
  },
  {
    name: 'Duchess',
    type: 'Angora',
    lives: 9,
    isSidekick: false
  },
  {
    name: 'Stimpy',
    type: 'Manx',
    lives: 1,
    isSidekick: true
  }];

  it('inserts a cat into /api/v1/cats', async () => {
    const felix = cats[0];

    const res = await request(app)
      .post('/api/v1/cats')
      .send(felix);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: '1', ...felix });
      
  });

  it('gets a cat from /api/v1/cats:id', async () => {
    const cat = await Cat.insert(cats[0]);
    
    const res = await request(app)
      .get(`/api/v1/cats/${cat.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(cat);
  });

  it('gets all cats from /api/v1/cats', async () => {
    const allCats = await Promise.all(
      cats.map(cat => Cat.insert(cat))
    );

    const res = await request(app)
      .get('/api/v1/cats/');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining(allCats));
  });

  it('updates a cat in /api/v1/cats:id', async () => {
    const cat = await Cat.insert(cats[0]);
    cat.isSidekick = false;
    cat.lives = 25;
  
    const res = await request(app)
      .put(`/api/v1/cats/${cat.id}`)
      .send(cat);
  
    expect(res.status).toBe(200);
    expect(res.body).toEqual(cat);
  });

  it('deletes a cat from /api/v1/cats:id', async () => {
    const cat = await Cat.insert(cats[0]);
    
    const res = await request(app)
      .delete(`/api/v1/cats/${cat.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(cat);
  });

});

describe('/api/v1/people', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('inserts a person into /api/v1/people', async () => {
    const person = { name: 'bob', age: 60, bornIn: 'Portland' };

    const res = await request(app)
      .post('/api/v1/people')
      .send(person);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: '1', ...person });
      
  });

  it('gets a person from /api/v1/people:id', async () => {
    const person = await Person.insert({ name: 'bob', age: 60, bornIn: 'Portland' });
    
    const res = await request(app)
      .get(`/api/v1/people/${person.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(person);
  });

  it('gets all people from /api/v1/people', async () => {
    const people = [{ name: 'bob', age: 60, bornIn: 'Portland' }, { name: 'jane', age: 47, bornIn: 'Los Angeles' }, { name: 'Ricky', age: 27, bornIn: 'Zurich' }, { name: 'Mary', age: 99, bornIn: 'London' }];
    const allPeople = await Promise.all(
      people.map(person => Person.insert(person))
    );

    const res = await request(app)
      .get('/api/v1/people');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining(allPeople));
  });
  it('updates a person from /api/v1/people/:id', async () => {
    const person = await Person.insert({ name: 'bob', age: 60, bornIn: 'Portland' });
    person.age = 1000000; 
    person.name = 'george';
    const res = await request(app)
      .put(`/api/v1/people/${person.id}`)
      .send(person);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(person);
  });
  it('deletes a person from /api/v1/people/:id', async () => {
    const person = await Person.insert({ name: 'bob', age: 60, bornIn: 'Portland' });
    const res = await request(app)
      .delete(`/api/v1/people/${person.id}`);


    expect(res.status).toBe(200);
    expect(res.body).toEqual(person);
  });
});
describe('/api/v1/cities', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('inserts a city into /api/v1/cities', async () => {
    const city = { name: 'Portland', country: 'United States', hasBeach: false };

    const res = await request(app)
      .post('/api/v1/cities')
      .send(city);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: '1', ...city });
      
  });

  it('gets a city from /api/v1/cities:id', async () => {
    const city = await City.insert({ name: 'Portland', country: 'United States', hasBeach: false });
    
    const res = await request(app)
      .get(`/api/v1/cities/${city.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(city);
  });

  it('gets all cities from /api/v1/cities', async () => {
    const cities = [{ name: 'Portland', country: 'United States', hasBeach: false }, { name: 'Bogota', age: 47, bornIn: 'Los Angeles' }, { name: 'Ricky', age: 27, bornIn: 'Zurich' }, { name: 'Mary', age: 99, bornIn: 'London' }];

    const allCities = await Promise.all(
      cities.map(city => City.insert(city))
    );

    const res = await request(app)
      .get('/api/v1/cities');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining(allCities));
  });
  it('updates a city at /api/v1/cities/:id', async () => {
    const city = await City.insert({ name: 'Portland', country: 'United States', hasBeach: false });
    city.name = 'PDX'; 

    const res = await request(app)
      .put(`/api/v1/cities/${city.id}`)
      .send(city);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(city);
  });
  it('deletes a city from /api/v1/cities/:id', async () => {
    const city = await City.insert({ name: 'Portland', country: 'United States', hasBeach: false });

    const res = await request(app)
      .delete(`/api/v1/cities/${city.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(city);
  });
});
