import express, { Request, Response } from "express";
import cors from "cors";
import { IEmployeeEntity } from "../../@types/employee-entity";
import { generateMockEmployees } from "./utils/generateMockEmployees";

const app = express();
const port = 3000;

// In-memory store for employee data
let employees: IEmployeeEntity[] = generateMockEmployees(10);

// Middleware to parse JSON request bodies
app.use(express.json());

// CORS middleware to allow requests from front-end local development server
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://127.0.0.1:4173"],
  })
);

// GET all employees with query parameter filtering
app.get("/api/employees", (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const deleted = req.query.deleted === "true";

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let results = employees.slice(startIndex, endIndex);

  if (deleted) {
    results = employees.filter((e) => e.isDeleted);
  } else {
    results = employees.filter((e) => !e.isDeleted);
  }

  res.json({ employees: results, count: results.length });
});

// GET employee by ID
app.get("/api/employees/:id", (req: Request, res: Response) => {
  const employee = employees.find((e) => e._id === req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send("Employee not found");
  }
});

// POST new employee
app.post("/api/employees", (req: Request, res: Response) => {
  const employee = req.body;
  employee.id = Date.now().toString();
  employees.push(employee);
  res.status(201).json(employee);
});

// DELETE employee by ID
app.delete("/api/employees/:id", (req: Request, res: Response) => {
  const employeeIndex = employees.findIndex((e) => e._id === req.params.id);
  if (employeeIndex !== -1) {
    employees[employeeIndex].isDeleted = true;
    res.sendStatus(204);
  } else {
    res.status(404).send("Employee not found");
  }
});

// PERMANENTLY DELETE employee by ID
app.delete("/api/employees/:id/permanent", (req: Request, res: Response) => {
  const employeeIndex = employees.findIndex((e) => e._id === req.params.id);
  if (employeeIndex !== -1) {
    employees.splice(employeeIndex, 1);
    res.sendStatus(204);
  } else {
    res.status(404).send("Employee not found");
  }
});

// PATCH employee by ID
app.patch("/api/employees/:id", (req: Request, res: Response) => {
  const employeeIndex = employees.findIndex((e) => e._id === req.params.id);
  if (employeeIndex !== -1) {
    employees[employeeIndex] = { ...employees[employeeIndex], ...req.body };
    res.json(employees[employeeIndex]);
  } else {
    res.status(404).send("Employee not found");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
