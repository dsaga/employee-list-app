import { IEmployeeEntity } from "types/index";

export const mockEmployees: IEmployeeEntity[] = [
  {
    _id: "1",
    deletedAt: null,
    isDeleted: false,
    dateOfBirth: "1990-01-01",
    dateOfEmployment: "2020-01-01",
    homeAddress: {
      addressLine2: "Apt 123",
      addressLine1: "123 Main St",
      ZIPCode: "12345",
      city: "Anytown",
      _id: "1",
    },
    phoneNumber: "555-1234",
    email: "john.doe@example.com",
    name: "John Doe",
  },
  {
    _id: "2",
    deletedAt: null,
    isDeleted: false,
    dateOfBirth: "1995-02-01",
    dateOfEmployment: "2021-01-01",
    homeAddress: {
      addressLine2: "Apt 456",
      addressLine1: "456 Main St",
      ZIPCode: "67890",
      city: "Othertown",
      _id: "2",
    },
    phoneNumber: "555-5678",
    email: "jane.smith@example.com",
    name: "Jane Smith",
  },
  // Add more employees here...
];
