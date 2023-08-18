export interface IEmployeeEntity {
  _id: string;
  deletedAt?: null;
  isDeleted?: boolean;
  dateOfBirth: string;
  dateOfEmployment: string;
  homeAddress: {
    addressLine2: string;
    addressLine1: string;
    ZIPCode: string;
    city: string;
    _id?: string;
  };
  phoneNumber: string;
  email: string;
  name: string;
}
