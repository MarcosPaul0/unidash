"use client";

import { Toolbar } from "../../_components/Toolbar";
import { APP_ROUTES } from "@unidash/routes/app.routes";
import { RegisterStudentForm } from "../_components/RegisterStudentForm";
import { useCourseStore } from "@unidash/store/course.store";

export default function RegisterStudentPage() {
  const { activeCourse } = useCourseStore();

  return (
    <>
      <Toolbar
        breadcrumbPage="Novo aluno"
        breadcrumbItems={[
          {
            label: "Lista de alunos",
            link: `${APP_ROUTES.private.student}${activeCourse?.id}`,
          },
        ]}
      />

      <RegisterStudentForm />
    </>
  );
}
