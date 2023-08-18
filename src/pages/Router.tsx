import { Routes, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { EmployeeDetailPage } from "./EmployeeDetailPage";
import { EmployeesArchive } from "./EmployeesArchive";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/employees-archive" element={<EmployeesArchive />} />
      <Route path="/employees/:id" element={<EmployeeDetailPage />} />
    </Routes>
  );
}
