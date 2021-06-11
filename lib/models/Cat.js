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
}
