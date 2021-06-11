import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Motorcycle from '../lib/models/Motorcycle';

describe('demo routes', () => {
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
});
