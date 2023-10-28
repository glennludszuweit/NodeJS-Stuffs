import { ContactResponseModel } from '../entities/contact';
import { ContactRepositoryInterface } from '../interfaces/contact-repository-interface';
import { GetAllContactsInterface } from '../interfaces/get-all-contacts-interface';

export class GetAllContacts implements GetAllContactsInterface {
  contactRepository: ContactRepositoryInterface;
  constructor(contactRepository: ContactRepositoryInterface) {
    this.contactRepository = contactRepository;
  }

  async execute(): Promise<ContactResponseModel[]> {
    const result = await this.contactRepository.getContacts();
    return result;
  }
}
