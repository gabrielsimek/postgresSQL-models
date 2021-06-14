import { promises as fs } from 'fs';
// import path from 'path';
export default (pool) => {
  return fs
    .readFile(
      './sql/setup.sql',
      {
        encoding: 'utf-8',
      }
    )
    .then((sql) => pool.query(sql));
};



// import dotenv from 'dotenv';
// dotenv.config();
// import { promises as fs } from 'fs';


// export default async (pool) => {
//   const sql = await fs
//     .readFile(
//       'C:/Users/gabri/alchemy/career-track/postgresSQL-models/sql/setup.sql',
//       {
//         encoding: 'utf-8',
//       }
//     );
//   return pool.query(sql);
// };
