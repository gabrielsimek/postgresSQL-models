import pool from '../utils/pool';
export default class Person {
    id;
    name;
    age;
    bornIn;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.age = row.age;
      this.bornIn = row.born_in;
    }

    static async insert({ name, age, bornIn }){
      const { rows } = await pool.query(
        `INSERT INTO people (name, age, born_in)
        VALUES ($1, $2, $3 )
        RETURNING *
        `, [name, age, bornIn]
      );
      return new Person(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT * FROM people
      WHERE id = $1
      `, [id]
      );
      return new Person(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM people'
      );
      return rows.map(row => new Person(row));
    }

    static async update(id, { name, age, bornIn }){
      console.log(id, name, age, bornIn);
      const { rows } = await pool.query(
        `UPDATE people
        SET  name = $1,
             age = $2,
             born_in = $3
        WHERE id = $4
        RETURNING *
      `, [name, age, bornIn, id]
      );
      return new Person(rows[0]);
    }

    static async remove(id){
      const { rows } = await pool.query(
        `DELETE FROM people
      WHERE id = $1
      RETURNING *
      `, [id]
      );
      return new Person(rows[0]);
    }


}
