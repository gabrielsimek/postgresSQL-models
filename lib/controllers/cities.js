import { Router } from 'express';
import City from '../models/City';
export default Router()
  .post('/api/v1/cities', async (req, res) => {
    try {
        
      const city = await City.insert(req.body);
      res.send(city);
          
    } catch (error) {
      res.send(500).send({ error: error.message });
    }
  })
  .get('/api/v1/cities/:id', async (req, res) => {
    try {
      const city = await City.findById(req.params.id);
      res.send(city);
        
    } catch (error) {
      res.send(500).send({ error: error.message });
    }
  })
  .get('/api/v1/cities', async (req, res) => {
    try {
      const city = await City.find();
      res.send(city);
        
    } catch (error) {
      res.send(500).send({ error: error.message });
    }
  })
  .put('/api/v1/cities/:id', async (req, res) => {
    try {
      const city = await City.update(req.params.id, req.body);
      res.send(city);
        
    } catch (error) {
      res.send(500).send({ error: error.message });
    }
  })
  .delete('/api/v1/cities/:id', async (req, res) => {
    try {
      const city = await City.remove(req.params.id);
      res.send(city);
        
    } catch (error) {
      res.send(500).send({ error: error.message });
    }
  });

