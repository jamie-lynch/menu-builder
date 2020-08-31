import { getConnection, createConnection } from "typeorm";

const connection = {
  async create() {
    await createConnection({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: ["src/entities/*.ts"],
    });
  },
  async close() {
    await getConnection().close();
  },
  async clear() {
    const conn = getConnection();
    const entities = conn.entityMetadatas;

    for (const entity of entities) {
      const repository = conn.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    }
  },
};

export default connection;
