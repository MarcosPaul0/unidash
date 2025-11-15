"use client";

import { PopoverTrigger } from "@radix-ui/react-popover";
import { Badge } from "@unidash/components/Badge";
import { Popover, PopoverContent } from "@unidash/components/Popover";
import { TeacherRoleMenuProps } from "./teacherRoleMenu.interface";
import {
  TEACHER_ROLE,
  TeacherRole,
} from "@unidash/api/responses/teacherCourse.response";
import { TeacherCourseCSService } from "@unidash/services/teacherCourse/teacherCourse.cs.service";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import { Toast } from "@unidash/utils/toast.util";
import {
  SET_TEACHER_COURSE_ERROR_MESSAGES,
  SET_TEACHER_COURSE_SUCCESS_MESSAGE,
} from "@unidash/api/messages/setTeacherCourse.message";
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

const ALL_TEACHER_ROLES = Object.values(TEACHER_ROLE);

export const TEACHER_ROLE_LABELS = {
  [TEACHER_ROLE.internshipManagerTeacher]: "Coord. de Estágio",
  [TEACHER_ROLE.courseManagerTeacher]: "Coord. de Curso",
  [TEACHER_ROLE.workCompletionManagerTeacher]: "Coord. de TCC",
  [TEACHER_ROLE.complementaryActivitiesManagerTeacher]:
    "Coord. de Atividades Complementares",
  [TEACHER_ROLE.extensionsActivitiesManagerTeacher]: "Coord. de Extensão",
  [TEACHER_ROLE.normalTeacher]: "Docente",
} as const;

export const TEACHER_ROLE_BADGE_COLOR = {
  [TEACHER_ROLE.internshipManagerTeacher]:
    "bg-icon-green text-icon-green-foreground",
  [TEACHER_ROLE.courseManagerTeacher]: "bg-icon-red text-icon-red-foreground",
  [TEACHER_ROLE.workCompletionManagerTeacher]:
    "bg-icon-yellow text-icon-yellow-foreground",
  [TEACHER_ROLE.complementaryActivitiesManagerTeacher]:
    "bg-icon-orange text-icon-orange-foreground",
  [TEACHER_ROLE.extensionsActivitiesManagerTeacher]:
    "bg-icon-purple text-icon-purple-foreground",
  [TEACHER_ROLE.normalTeacher]: "bg-icon-blue text-icon-blue-foreground",
} as const;

export function TeacherRoleMenu({ teacherCourse }: TeacherRoleMenuProps) {
  const router = useRouter();

  async function handleChangeTeacherRole(teacherRole: TeacherRole) {
    try {
      await TeacherCourseCSService.setTeacherCourse({
        courseId: teacherCourse.courseId,
        teacherId: teacherCourse.teacherId,
        teacherRole,
      });

      Toast.success(SET_TEACHER_COURSE_SUCCESS_MESSAGE.updateTeacherRole);

      router.refresh();
    } catch (error) {
      ExceptionHandler.handle({
        error,
        errorMap: SET_TEACHER_COURSE_ERROR_MESSAGES,
        onError: (handledError) => {
          Toast.error(handledError.message);
        },
      });
    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Badge
          className={`
            text-xs md:text-sm ${
              TEACHER_ROLE_BADGE_COLOR[teacherCourse.teacherRole]
            }
          `}
        >
          {TEACHER_ROLE_LABELS[teacherCourse.teacherRole]}
          <CaretDownIcon />
        </Badge>
      </PopoverTrigger>

      <PopoverContent className="w-[360px] p-1">
        {ALL_TEACHER_ROLES.map((teacherRole) => (
          <button
            key={teacherRole}
            type="button"
            onClick={() => handleChangeTeacherRole(teacherRole)}
            className={`
              w-full p-2 hover:bg-table-active-row
              text-start cursor-pointer flex items-center
              justify-between gap-2
            `}
          >
            {TEACHER_ROLE_LABELS[teacherRole]}

            {teacherCourse.teacherRole === teacherRole && <CheckIcon />}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
