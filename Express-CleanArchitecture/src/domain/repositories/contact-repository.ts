// domain/repositories/contact-repository.ts

import { ContactDataSourceInterface } from '../../data/interfaces/contact-datasource-interface';
import { ContactRequestModel, ContactResponseModel } from '../entities/contact';
import { ContactRepositoryInterface } from '../interfaces/contact-repository-interface';

export class ContactRepositoryImpl implements ContactRepositoryInterface {
  contactDataSource: ContactDataSourceInterface;
  constructor(contactDataSource: ContactDataSourceInterface) {
    this.contactDataSource = contactDataSource;
  }
  async deleteContact(id: String) {
    await this.contactDataSource.deleteOne(id);
  }
  async updateContact(id: String, data: ContactRequestModel) {
    await this.contactDataSource.updateOne(id, data);
  }
  async getContact(id: String): Promise<ContactResponseModel | null> {
    const result = await this.contactDataSource.getOne(id);
    return result;
  }

  async createContact(contact: ContactRequestModel) {
    await this.contactDataSource.create(contact);
  }
  async getContacts(): Promise<ContactResponseModel[]> {
    const result = await this.contactDataSource.getAll();
    return result;
  }
}
