import { Router } from 'express';
import Person from '../models/Person';
export default Router()
  .post('/api/v1/people', async (req, res) => {
    try {
        
      const person = await Person.insert(req.body);
      res.send(person);
          
    } catch (error) {
      res.send(500).send({ error: error.message });
    }
  })
  .get('/api/v1/people/:id', async (req, res) => {
    try {
      const person = await Person.findById(req.params.id);
      res.send(person);
        
    } catch (error) {
      res.send(500).send({ error: error.message });
    }
  })
  .get('/api/v1/people', async (req, res) => {
    try {
      const person = await Person.find();
      res.send(person);
        
    } catch (error) {
      res.send(500).send({ error: error.message });
    }
  })
  .put('/api/v1/people/:id', async (req, res) => {
    try {
      const person = await Person.update(req.params.id, req.body);
      res.send(person);
        
    } catch (error) {
      res.send(500).send({ error: error.message });
    }
  })
  .delete('/api/v1/people/:id', async (req, res) => {
    try {
      const person = await Person.remove(req.params.id);
      res.send(person);
        
    } catch (error) {
      res.send(500).send({ error: error.message });
    }
  });

