import { ContactRequestModel } from '../entities/contact';

export interface CreateContactInterface {
  execute(contact: ContactRequestModel): void;
}
