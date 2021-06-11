import { Router } from 'express';
import Cat from '../models/Cat';
export default Router()
  .post('/api/v1/cats', async (req, res) => {
    try {
      const cat = await Cat.insert(req.body);
      res.send(cat);
        
    } catch (error) {
      res.status(500).send({ error : error.message });
        
    }
  })
  .get('/api/v1/cats/:id', async (req, res) => {
    try {
      const cat = await Cat.findById(req.params.id);
      res.send(cat);
          
    } catch (error) {
      res.status(500).send({ error : error.message });
    }
  })
  .get('/api/v1/cats', async (req, res) => {
    try {
      const cat = await Cat.find();
      res.send(cat);
          
    } catch (error) {
      res.status(500).send({ error : error.message });
    }
  })
  .put('/api/v1/cats/:id', async (req, res) => {
    try {
      const cat = await Cat.update(req.body, req.params.id);
      res.send(cat);
        
    } catch (error) {
      res.status(500).send({ error : error.message });
        
    }
  });
