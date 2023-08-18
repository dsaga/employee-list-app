import { IEmployeeEntity } from "./employee-entity";

export interface IGetEmployeeDto {
  employees: IEmployeeEntity[];
  count: number;
}
