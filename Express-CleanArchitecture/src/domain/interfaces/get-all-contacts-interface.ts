import { ContactResponseModel } from '../entities/contact';

export interface GetAllContactsInterface {
  execute(): Promise<ContactResponseModel[]>;
}
