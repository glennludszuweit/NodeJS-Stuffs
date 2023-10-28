// domain/interfaces/repositories/contact-repository.ts

import { ContactRequestModel, ContactResponseModel } from '../entities/contact';

export interface ContactRepositoryInterface {
  createContact(contact: ContactRequestModel): void;
  deleteContact(id: String): void;
  updateContact(id: String, data: ContactRequestModel): void;
  getContacts(): Promise<ContactResponseModel[]>;
  getContact(id: String): Promise<ContactResponseModel | null>;
}
