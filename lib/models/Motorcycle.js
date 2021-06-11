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

    static async insert({ make, model, horsepower }){
      const { rows } = await pool.query(
        `INSERT INTO motorcycles (make, model, horsepower)
        VALUES ($1, $2, $3 )
        RETURNING *
        `, [make, model, horsepower]
      );
      return new Motorcycle(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT * FROM motorcycles
        WHERE id = $1
        `, [id]
      );
      return new Motorcycle(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM motorcycles'
      );
      return rows.map(item => new Motorcycle(item));
    }

    static async update(id, { make, model, horsepower }){
      const { rows } = await pool.query(
        `UPDATE motorcycles
          SET  make = $1,
               model = $2,
               horsepower = $3
          WHERE id = $4
          RETURNING *
        `, [make, model, horsepower, id]
      );
      return new Motorcycle(rows[0]);
    }


}
