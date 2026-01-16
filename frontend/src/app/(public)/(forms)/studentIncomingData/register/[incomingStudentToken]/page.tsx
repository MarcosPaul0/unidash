import { Toolbar } from "@unidash/app/(private)/_components/Toolbar";
import { StudentIncomingDataForm } from "@unidash/app/(private)/studentIncomingData/_components/StudentIncomingDataForm";

interface RegisterStudentIncomingFromEmailPageProps {
  params: Promise<{ incomingStudentToken: string }>;
}

export default async function RegisterStudentIncomingFromEmailPage({
  params,
}: RegisterStudentIncomingFromEmailPageProps) {
  const { incomingStudentToken } = await params;

  return (
    <>
      <Toolbar breadcrumbPage="Registro de ingresso no curso" />

      <StudentIncomingDataForm incomingStudentToken={incomingStudentToken} />
    </>
  );
}
