import {
  ContactRequestModel,
  ContactResponseModel,
} from '../../domain/entities/contact';
import { ContactDataSourceInterface } from '../interfaces/contact-datasource-interface';
import { SQLDatabaseWrapperInterface } from '../interfaces/sql-database-wrapper-interface';

const DB_TABLE = 'tb_contact';
export class PostgreContactDataSource implements ContactDataSourceInterface {
  private db: SQLDatabaseWrapperInterface;
  constructor(db: SQLDatabaseWrapperInterface) {
    this.db = db;
  }

  async create(contact: ContactRequestModel) {
    await this.db.query(`insert into ${DB_TABLE} (name) values ($1)`, [
      contact.name,
    ]);
  }

  async getAll(): Promise<ContactResponseModel[]> {
    const dbResponse = await this.db.query(`select * from ${DB_TABLE}`);
    const result = dbResponse.rows.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    return result;
  }

  async deleteOne(id: String) {
    await this.db.query(`delete ${DB_TABLE} where id = $1`, [id]);
  }

  async updateOne(id: String, data: ContactRequestModel) {
    await this.db.query(`update ${DB_TABLE} set name = $1 where id = $2`, [
      data.name,
      id,
    ]);
  }

  async getOne(id: String): Promise<ContactResponseModel | null> {
    const dbResponse = await this.db.query(
      `select * from ${DB_TABLE} where id = $1 limit 1`,
      [id]
    );
    const result = dbResponse.rows.map((item) => ({
      id: item.id,
      name: item.name,
    }));

    return result[0];
  }
}
