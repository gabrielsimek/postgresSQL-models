import pool from '../utils/pool';
export default class City {
    id;
    name;
    country;
    hasBeach;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.country = row.country;
      this.hasBeach = row.has_beach;
    }

    static async insert({ name, country, hasBeach }){
      const { rows } = await pool.query(
        `INSERT INTO cities (name, country, has_beach)
            VALUES ($1, $2, $3 )
            RETURNING *
        `, [name, country, hasBeach]
      );
     
      return new City(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT * FROM cities
            WHERE id = $1
    `, [id]
      );
      return new City(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM cities'
      );
      return rows.map(row => new City(row));
    }

    static async update(id, { name, country, hasBeach }){
      const { rows } = await pool.query(
        `UPDATE cities
      SET  name = $1,
           country = $2,
           has_beach = $3
      WHERE id = $4
      RETURNING *
    `, [name, country, hasBeach, id]
      );
      return new City(rows[0]);
    }

    static async remove(id){
      const { rows } = await pool.query(
        `DELETE FROM cities
            WHERE id = $1
            RETURNING *
    `, [id]
      );
      return new City(rows[0]);
    }


}
