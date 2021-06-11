import pool from '../utils/pool';

export default class Pokemon {
    id;
    name;
    typeOne;
    typeTwo;
    attack;

    constructor(row){
      this.id = row.id;
      this.name = row.name;
      this.typeOne = row.type_1;
      this.typeTwo = row.type_2;
      this.attack = row.attack;
    }

    static async insert({ name, typeOne, typeTwo, attack }){
     
      const { rows } = await pool.query(
        `INSERT INTO pokemon (name, type_1, type_2, attack)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `, [name, typeOne, typeTwo, attack]
      );
      return new Pokemon(rows[0]);
    }
    
    static async findById(id){
      const { rows } = await pool.query(
        `SELECT * FROM pokemon
        WHERE id = $1
        `, [id]
      );
      return new Pokemon(rows[0]);
    }

    static async find(){
      const { rows } = await pool.query(
        'SELECT * FROM pokemon'
      );
      return rows.map(row => new Pokemon(row));
    }

    static async remove(id){
      const { rows } = await pool.query(
        `DELETE FROM pokemon
        WHERE id = $1
        RETURNING *
        `, [id]
      );
      return new Pokemon(rows[0]);
    }
}
