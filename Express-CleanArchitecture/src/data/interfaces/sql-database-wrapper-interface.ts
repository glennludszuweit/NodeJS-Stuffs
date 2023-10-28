export interface SQLDatabaseWrapperInterface {
  query(queryString: String, queryConfig?: any[]): Promise<{ rows: any[] }>;
}
