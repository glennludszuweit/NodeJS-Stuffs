export interface DatabaseWrapperInterface {
  find(query: object): Promise<any[]>;
  insertOne(doc: any): Promise<any>;
}
