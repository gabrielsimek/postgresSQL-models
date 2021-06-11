import { Router } from 'express';
import Motorcycle from '../models/Motorcycle';


export default Router()
  .post('/api/v1/motorcycles', async (req, res) => {
    try {

      const motorcycle = await Motorcycle.insert(req.body);
      res.send(motorcycle);
    }
    catch (err){
      res.status(500).send({ error: err.message });
    }
    
  })
  .get('/api/v1/motorcycles:id', async (req, res) => {
    try {
      const motorcycle = await Motorcycle.findById(req.params.id);
      res.send(motorcycle);
    }
    catch(err) {
      res.status(500).send({ error: err.message });
    }
  })
  .get('/api/v1/motorcycles', async (req, res) => {
    try {
      const motorcycles = await Motorcycle.find();
      res.send(motorcycles);
    }
    catch(err) {
      res.status(500).send({ error: err.message });
    }
  });
