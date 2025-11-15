"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FindTeacherDto,
  findTeacherDtoSchema,
} from "@unidash/api/dtos/teacher.dto";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@unidash/components/Popover";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AddTeacherCourseList } from "../AddTeacherCourseList";
import { AddTeacherCourseForm } from "../AddTeacherCourseForm";
import { AddTeacherPopoverProps } from "./addTeacherPopover.interface";
import { TeachersResponse } from "@unidash/api/responses/teacher.response";

export function AddTeacherPopover({ courseId }: AddTeacherPopoverProps) {
  const [teachersOutsideOfCourse, setTeachersOutsideOfCourse] = useState<
    TeachersResponse["teachers"]
  >([]);
  const [teachersListIsOpen, setTeachersListIsOpen] = useState(false);

  const formMethods = useForm<FindTeacherDto>({
    resolver: zodResolver(findTeacherDtoSchema),
    defaultValues: {
      nameOrEmail: "",
    },
  });

  async function handleOpenTeachersList() {
    setTeachersListIsOpen(true);
  }

  function handleSearchTeachersOutsideOfCourse(
    teachersResponse: TeachersResponse
  ) {
    setTeachersOutsideOfCourse(teachersResponse.teachers);
  }

  return (
    <Popover open={teachersListIsOpen} onOpenChange={setTeachersListIsOpen}>
      <PopoverAnchor>
        <FormProvider {...formMethods}>
          <AddTeacherCourseForm
            courseId={courseId}
            onSearchTeachersOutsideOfCourse={
              handleSearchTeachersOutsideOfCourse
            }
            handleOpenTeachersList={handleOpenTeachersList}
          />
        </FormProvider>
      </PopoverAnchor>

      <PopoverContent className="w-[600px] p-0" side="bottom" align="start">
        <AddTeacherCourseList
          teachers={teachersOutsideOfCourse}
          setTeachersOutsideOfCourse={setTeachersOutsideOfCourse}
        />
      </PopoverContent>
    </Popover>
  );
}
