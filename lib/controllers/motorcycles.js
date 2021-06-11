import { Router } from 'express';

export default Router()
  .post('/api/v1/motorcycles', async (req, res) => {
    try {
      res.send({ hi: 'there' });
    }
    catch (err){
      res.status(500).send(err);
    }
    
  });
