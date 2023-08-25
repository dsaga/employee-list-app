import { IEmployeeEntity } from "../../../@types/employee-entity";
import { faker } from "@faker-js/faker";

export function generateMockEmployees(count: number): IEmployeeEntity[] {
  const employees: IEmployeeEntity[] = [];

  for (let i = 0; i < count; i++) {
    const employee: IEmployeeEntity = {
      _id: faker.datatype.uuid(),
      deletedAt: null,
      isDeleted: false,
      dateOfBirth: faker.date.past().toISOString(),
      dateOfEmployment: faker.date.past().toISOString(),
      homeAddress: {
        addressLine1: faker.address.streetAddress(),
        addressLine2: faker.address.secondaryAddress(),
        city: faker.address.city(),
        ZIPCode: faker.address.zipCode(),
      },
      phoneNumber: faker.phone.number(),
      email: faker.internet.email(),
      name: faker.person.firstName(),
    };

    employees.push(employee);
  }

  return employees;
}
