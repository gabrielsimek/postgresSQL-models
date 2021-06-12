import cats from '../controllers/cats';
import pool from '../utils/pool';

export default class Cat {
    id;
    name;
    type;
    lives;
    isSidekick;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.type = row.type;
      this.lives = row.lives;
      this.isSidekick = row.is_sidekick;
    }

    static async insert({ name, type, lives, isSidekick }){
      const { rows } = await pool.query(
        `INSERT INTO cats (name, type, lives, is_sidekick)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [name, type, lives, isSidekick]
      );
      return new Cat(rows[0]);
    }
    
    static async findById(id){
      const { rows } = await pool.query(
        `SELECT * FROM cats
        WHERE id = $1
        `, [id]
      );
      return new Cat(rows[0]);
    }
    
    static async find(){
      const { rows } = await pool.query(
        ' SELECT * FROM cats'
      );
      return rows.map(row => new Cat(row));
    }
    
    static async update({ name, type, lives, isSidekick }, id){
      const { rows } = await pool.query(
        `UPDATE cats
        SET  name = $1,
             type = $2,
             lives = $3,
             is_sidekick = $4
        WHERE id = $5
        RETURNING *
      `, [name, type, lives, isSidekick, id]
      );
      return new Cat(rows[0]);
    }

    static async remove(id){
      console.log(id);
      const { rows } = await pool.query(
        `DELETE FROM cats
          WHERE id = $1
          RETURNING *
          `, [id]
      );
      return new Cat(rows[0]);
    }
}
