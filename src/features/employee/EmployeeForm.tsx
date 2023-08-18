import { IEmployeeEntity, ICreateEmployeeDto } from "types/index";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box } from "@mui/material";

import styles from "./EmployeeForm.module.scss";

interface IEmployeeFormProps {
  employee?: IEmployeeEntity;
  onSave: (payload: ICreateEmployeeDto) => void;
}

const EmployeeFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(
      /^\+?\d{10,14}$/,
      "Phone number must be a valid phone number with country code"
    )
    .required("Phone number is required"),
  homeAddress: Yup.object().shape({
    city: Yup.string().required("City is required"),
    ZIPCode: Yup.string().required("ZIP code is required"),
    addressLine1: Yup.string().required("Address line 1 is required"),
    addressLine2: Yup.string(),
  }),
  dateOfEmployment: Yup.date()
    .required("Date of employment is required")
    .typeError("Invalid date format")
    .max(new Date(), "Date of employment cannot be in the future"),
  dateOfBirth: Yup.date()
    .required("Date of birth is required")
    .typeError("Invalid date format")
    .max(new Date(), "Date of birth cannot be in the future"),
});

export function EmployeeForm({ employee, onSave }: IEmployeeFormProps) {
  const initialValues = {
    _id: employee?._id || "",
    name: employee?.name || "",
    email: employee?.email || "",
    phoneNumber: employee?.phoneNumber || "",
    homeAddress: {
      city: employee?.homeAddress?.city || "",
      ZIPCode: employee?.homeAddress?.ZIPCode || "",
      addressLine1: employee?.homeAddress?.addressLine1 || "",
      addressLine2: employee?.homeAddress?.addressLine2 || "",
    },
    dateOfEmployment: employee?.dateOfEmployment || "",
    dateOfBirth: employee?.dateOfBirth || "",
  };

  return (
    <Box sx={{ p: 2 }}>
      <Formik
        initialValues={initialValues}
        validationSchema={EmployeeFormSchema}
        onSubmit={(values) => {
          console.log("on save");
          onSave(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Box className={styles.formFieldContainer}>
              <Field
                className={styles.formField}
                as={TextField}
                name="name"
                label="Name"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <Field
                className={styles.formField}
                as={TextField}
                name="email"
                label="Email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                className={styles.formField}
                as={TextField}
                name="phoneNumber"
                label="Phone Number"
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
              <Field
                className={styles.formField}
                as={TextField}
                name="homeAddress.city"
                label="City"
                error={
                  touched.homeAddress?.city && Boolean(errors.homeAddress?.city)
                }
                helperText={
                  touched.homeAddress?.city && errors.homeAddress?.city
                }
              />
              <Field
                className={styles.formField}
                as={TextField}
                name="homeAddress.ZIPCode"
                label="ZIP Code"
                error={
                  touched.homeAddress?.ZIPCode &&
                  Boolean(errors.homeAddress?.ZIPCode)
                }
                helperText={
                  touched.homeAddress?.ZIPCode && errors.homeAddress?.ZIPCode
                }
              />
              <Field
                className={styles.formField}
                as={TextField}
                name="homeAddress.addressLine1"
                label="Address Line 1"
                error={
                  touched.homeAddress?.addressLine1 &&
                  Boolean(errors.homeAddress?.addressLine1)
                }
                helperText={
                  touched.homeAddress?.addressLine1 &&
                  errors.homeAddress?.addressLine1
                }
              />
              <Field
                className={styles.formField}
                as={TextField}
                name="homeAddress.addressLine2"
                label="Address Line 2"
                error={
                  touched.homeAddress?.addressLine2 &&
                  Boolean(errors.homeAddress?.addressLine2)
                }
                helperText={
                  touched.homeAddress?.addressLine2 &&
                  errors.homeAddress?.addressLine2
                }
              />
              <Field
                className={styles.formField}
                as={TextField}
                name="dateOfEmployment"
                label="Date of Employment"
                error={
                  touched.dateOfEmployment && Boolean(errors.dateOfEmployment)
                }
                helperText={touched.dateOfEmployment && errors.dateOfEmployment}
              />
              <Field
                className={styles.formField}
                as={TextField}
                name="dateOfBirth"
                label="Date of Birth"
                error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                helperText={touched.dateOfBirth && errors.dateOfBirth}
              />
              <Button
                className={styles.submitButton}
                variant="contained"
                type="submit"
              >
                {employee?._id
                  ? "Update Employee Record"
                  : "Create Employee Record"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
