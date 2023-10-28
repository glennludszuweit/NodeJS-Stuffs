import {
  ContactRequestModel,
  ContactResponseModel,
} from '../../domain/entities/contact';

export interface ContactDataSourceInterface {
  create(contact: ContactRequestModel): void;
  getAll(): Promise<ContactResponseModel[]>;
  deleteOne(id: String): void;
  updateOne(id: String, data: ContactRequestModel): void;
  getOne(id: String): Promise<ContactResponseModel | null>;
}
