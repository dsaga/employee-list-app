import React, { ReactNode, useEffect, useState } from "react";
import { useSaveEmployee } from "@/features/employee";
import { ICreateEmployeeDto } from "types/create-employee.dto";

interface RenderProps {
  children: (data: {
    isActiveForm: boolean;
    onToggleForm: () => void;
    onSaveForm: (payload: ICreateEmployeeDto) => void;
  }) => ReactNode;
  onSaved: () => void;
}

export const SaveFormProvider: React.FC<RenderProps> = ({
  children,
  onSaved,
}) => {
  const saveEmployee = useSaveEmployee();

  const [isCreating, setIsCreating] = useState(false);

  const handleToggleForm = () => {
    setIsCreating(!isCreating);
  };

  useEffect(() => {
    if (saveEmployee.isSaved) {
      onSaved();
      isCreating && handleToggleForm();
    }
  }, [saveEmployee.isSaved]);

  const handleSaveForm = (payload: ICreateEmployeeDto) => {
    saveEmployee.save(payload);
  };

  const data = {
    isActiveForm: isCreating,
    onToggleForm: handleToggleForm,
    onSaveForm: handleSaveForm,
  };

  return children(data);
};
