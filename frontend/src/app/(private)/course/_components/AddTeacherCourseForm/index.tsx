"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { FindTeacherDto } from "@unidash/api/dtos/teacher.dto";
import { FormInput } from "@unidash/components/FormInput";
import { useFormContext, useWatch } from "react-hook-form";
import { AddTeacherCourseFormProps } from "./addTeacherCourseForm.interface";
import { Button } from "@unidash/components/Button";
import { TeacherCSService } from "@unidash/services/teacher/teacher.cs.service";

const MIN_LENGTH_TO_SEARCH = 3;

export function AddTeacherCourseForm({
  courseId,
  onSearchTeachersOutsideOfCourse,
  handleOpenTeachersList,
}: AddTeacherCourseFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<FindTeacherDto>();

  const search = useWatch({ control, name: "nameOrEmail" });

  async function handleFocusSearch() {
    if (search.length <= MIN_LENGTH_TO_SEARCH) {
      return;
    }

    handleOpenTeachersList();
  }

  async function getTeachersOutsideOfCourse({ nameOrEmail }: FindTeacherDto) {
    try {
      const teachersResponse = await TeacherCSService.getAllOutsideCourse(
        courseId,
        undefined,
        {
          email: nameOrEmail,
          name: nameOrEmail,
        }
      );

      onSearchTeachersOutsideOfCourse(teachersResponse);
      handleOpenTeachersList();
    } catch {
      onSearchTeachersOutsideOfCourse({
        teachers: [],
        totalItems: 0,
        totalPages: 0,
      });
    }
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(getTeachersOutsideOfCourse)}
    >
      <FormInput
        control={control}
        name="nameOrEmail"
        className="rounded-xl"
        placeholder="Busque pelo nome ou email do docente"
        type="search"
        onFocus={handleFocusSearch}
      />

      <Button isLoading={isSubmitting}>
        <MagnifyingGlassIcon size={24} />
        Buscar docente
      </Button>
    </form>
  );
}
