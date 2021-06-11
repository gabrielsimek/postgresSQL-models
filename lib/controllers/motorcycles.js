import { Router } from 'express';
import Motorcycle from '../models/Motorcycle';


export default Router()
  .post('/api/v1/motorcycles', async (req, res) => {
    try {
      console.log(req.body);
      const motorcycle = await Motorcycle.insert(req.body);
      res.send(motorcycle);
    }
    catch (err){
      res.status(500).send({ error: err.message });
    }
    
  });
