import { ContactRequestModel } from '../entities/contact';
import { ContactRepositoryInterface } from '../interfaces/contact-repository-interface';
import { CreateContactInterface } from '../interfaces/create-contact-interface';

export class CreateContact implements CreateContactInterface {
  contactRepository: ContactRepositoryInterface;
  constructor(contactRepository: ContactRepositoryInterface) {
    this.contactRepository = contactRepository;
  }

  async execute(contact: ContactRequestModel) {
    await this.contactRepository.createContact(contact);
  }
}
