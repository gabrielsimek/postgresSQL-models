import pool from '../utils/pool';
export default class Motorcycle {
    id;
    make;
    model;
    horsepower;

    constructor(row) {
      this.id = row.id;
      this.make = row.make;
      this.model = row.model;
      this.horsepower = row.horsepower;
    }

    static async insert(req){
      const { rows } = await pool.query(
        `INSERT INTO motorcycles (make, model, horsepower)
       VALUES ($1, $2, $3 )
       RETURNING *
        `, [req.make, req.model, req.horsepower]
      );
      return new Motorcycle(rows[0]);
    }

}
