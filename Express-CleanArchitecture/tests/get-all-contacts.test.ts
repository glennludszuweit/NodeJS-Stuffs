import {
  ContactRequestModel,
  ContactResponseModel,
} from '../src/domain/entities/contact';
import { ContactRepositoryInterface } from '../src/domain/interfaces/contact-repository-interface';
import { GetAllContacts } from '../src/domain/use-cases/get-all-contacts';

describe('Get All Contacts Use Case', () => {
  class MockContactRepository implements ContactRepositoryInterface {
    deleteContact(id: String): void {
      throw new Error('Method not implemented.');
    }
    updateContact(id: String, data: ContactRequestModel): void {
      throw new Error('Method not implemented.');
    }
    getContact(id: String): Promise<ContactResponseModel> {
      throw new Error('Method not implemented.');
    }
    createContact(contact: ContactRequestModel): void {
      throw new Error('Method not implemented.');
    }
    getContacts(): Promise<ContactResponseModel[]> {
      throw new Error('Method not implemented.');
    }
  }
  let mockContactRepository: ContactRepositoryInterface;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContactRepository = new MockContactRepository();
  });

  test('should return data', async () => {
    const ExpectedResult = [{ id: '1', name: 'Smith' }];

    jest
      .spyOn(mockContactRepository, 'getContacts')
      .mockImplementation(() => Promise.resolve(ExpectedResult));
    const getAllContactsUse = new GetAllContacts(mockContactRepository);
    const result = await getAllContactsUse.execute();
    expect(result).toStrictEqual(ExpectedResult);
  });
});
