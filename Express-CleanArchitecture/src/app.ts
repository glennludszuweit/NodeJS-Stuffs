import server from './server';
import { MongoClient } from 'mongodb';
import { Pool } from 'pg';
import { NoSQLDatabaseWrapperInterface } from './data/interfaces/nosql-database-wrapper-interface';
import { MongoDBContactDataSource } from './data/mongodb/mongodb-contact-datasource';
import { PGContactDataSource } from './data/mongodb/postgre-contact-datasource';
import { ContactsRouter } from './presentation/routers/contact-routers';
import { GetAllContacts } from './domain/use-cases/get-all-contacts';
import { CreateContact } from './domain/use-cases/create-contact';
import { ContactRepositoryImpl } from './domain/repositories/contact-repository';

async function getMongoDS() {
  const client: MongoClient = new MongoClient(
    'mongodb://localhost:27017/contacts'
  );
  await client.connect();
  const db = client.db('CONTACTS_DB');

  const contactDatabase: NoSQLDatabaseWrapperInterface = {
    find: (query) => db.collection('contacts').find(query).toArray(),
    insertOne: (doc) => db.collection('contacts').insertOne(doc),
    deleteOne: (id: String) => db.collection('contacts').deleteOne({ _id: id }),
    updateOne: (id: String, data: object) =>
      db.collection('contacts').updateOne({ _id: id }, data),
  };

  return new MongoDBContactDataSource(contactDatabase);
}

async function getPGDS() {
  const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'CONTACTSDB',
    password: '',
    port: 5432,
  });
  return new PGContactDataSource(db);
}

(async () => {
  const dataSource = await getPGDS();

  const contactMiddleWare = ContactsRouter(
    new GetAllContacts(new ContactRepositoryImpl(dataSource)),
    new CreateContact(new ContactRepositoryImpl(dataSource))
  );

  server.use('/contact', contactMiddleWare);
  server.listen(4000, () => console.log('Running on http://localhost:4000'));
})();
