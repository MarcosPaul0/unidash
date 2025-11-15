import { Toolbar } from "../../_components/Toolbar";
import { StudentIncomingDataForm } from "../_components/StudentIncomingDataForm";

export default async function RegisterStudentIncomingPage() {
  return (
    <>
      <Toolbar breadcrumbPage="Registro de ingresso no curso" />

      <StudentIncomingDataForm />
    </>
  );
}
