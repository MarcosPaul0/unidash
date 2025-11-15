"use client";

import { GraduationCapIcon } from "@phosphor-icons/react/dist/ssr";
import { CoursesResponse } from "@unidash/api/responses/course.response";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@unidash/components/Select";
import { CourseCSService } from "@unidash/services/course/course.cs.service";
import { useCourseStore } from "@unidash/store/course.store";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CourseSelectProps } from "./courseSelect.interface";

const LOCAL_STORAGE_COURSE_ID_ITEM = "unidash_lastActiveCourseId";

export function CourseSelect({ type }: CourseSelectProps) {
  const params = useParams();
  const pathname = usePathname();

  const router = useRouter();

  const {
    courses,
    activeCourse,
    setCourses,
    setActiveCourse,
    clearActiveCourse,
  } = useCourseStore();

  function handleChangeCourse(courseId: string) {
    const selectedCourse = courses.find(
      (currentCourse) => currentCourse.id === courseId
    );

    if (!selectedCourse) {
      clearActiveCourse();

      return;
    }

    setActiveCourse(selectedCourse);
    localStorage.setItem(LOCAL_STORAGE_COURSE_ID_ITEM, courseId);

    const hasCourseInRoute = Boolean(params?.courseId);

    if (hasCourseInRoute) {
      const currentCourseId = new RegExp(`${params.courseId}$`);
      const newPathname = pathname.replace(currentCourseId, courseId);

      router.replace(newPathname);
    }
  }

  useEffect(() => {
    (async () => {
      let coursesResponse: CoursesResponse;

      if (type === "authenticated") {
        coursesResponse = await CourseCSService.getAll();
      } else {
        coursesResponse = await CourseCSService.getAllForGuest();
      }

      setCourses(coursesResponse.courses);

      if (coursesResponse.courses.length === 1) {
        setActiveCourse(coursesResponse.courses[0]);
        return;
      }

      const lastActiveCourseId = localStorage.getItem(
        LOCAL_STORAGE_COURSE_ID_ITEM
      );

      if (!lastActiveCourseId) {
        return;
      }

      const lastActiveCourse = coursesResponse.courses.find(
        (course) => course.id === lastActiveCourseId
      );

      if (!lastActiveCourse) {
        localStorage.removeItem(LOCAL_STORAGE_COURSE_ID_ITEM);
        return;
      }

      setActiveCourse(lastActiveCourse);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectIsDisabled = courses.length <= 1;

  return (
    <Select
      onValueChange={handleChangeCourse}
      value={activeCourse ? activeCourse.id : undefined}
      disabled={selectIsDisabled}
    >
      <SelectTrigger
        className={`
            max-w-[460px] bg-button data-[placeholder]:text-button-foreground
            px-2 md:px-4 text-sm md:text-xl font-title font-semibold text-button-foreground
            [&_svg:not([class*='text-'])]:text-button-foreground rounded-2xl
            disabled:cursor-default disabled:text-button-foreground disabled:border-button
          `}
      >
        <GraduationCapIcon className="text-button-foreground size-4 md:size-6" />

        <SelectValue className="" placeholder="Selecione um curso" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cursos</SelectLabel>

          {courses.map((course) => (
            <SelectItem key={course.id} value={course.id}>
              {course.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
