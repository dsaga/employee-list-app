import { IEmployeeEntity } from "./employee-entity";

export interface ICreateEmployeeDto extends Omit<IEmployeeEntity, "_id"> {
  _id?: string;
}
