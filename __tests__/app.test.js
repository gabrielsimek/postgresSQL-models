import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Motorcycle from '../lib/models/Motorcycle';
import Pokemon from '../lib/models/Pokemon';
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
      .get(`/api/v1/motorcycles${motorcycle.id}`);
      
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
      .put(`/api/v1/motorcycles${cbr.id}`)
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

  it('gets a pokemon from /api/v1/pokemon:id', async () => {
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
    expect(res.body).toEqual(expected);
  });
  //!!!finish update
  it('updates a pokemon at /api/v1/pokemon/:id', async () => {
    const pokemon = await Pokemon.insert({ name: 'pikachu', typeOne: 'electric', typeTwo: 'NA', attack: 55 });
    pokemon.attack = 5000;
    pokemon.typeTwo = 'dragon';
    console.log(pokemon);
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
