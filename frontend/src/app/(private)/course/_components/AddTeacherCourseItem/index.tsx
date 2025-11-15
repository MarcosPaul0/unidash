import { Avatar, AvatarFallback } from "@unidash/components/Avatar";
import { Formatter } from "@unidash/utils/formatter.util";
import { UserPlusIcon } from "@phosphor-icons/react/dist/ssr";
import { AddTeacherCourseItemProps } from "./addTeacherCourseItem.interface";
import { TeacherCourseCSService } from "@unidash/services/teacherCourse/teacherCourse.cs.service";
import { TEACHER_ROLE } from "@unidash/api/responses/teacherCourse.response";
import { useParams, useRouter } from "next/navigation";
import { ExceptionHandler } from "@unidash/api/errors/exception.handler";
import {
  SET_TEACHER_COURSE_ERROR_MESSAGES,
  SET_TEACHER_COURSE_SUCCESS_MESSAGE,
} from "@unidash/api/messages/setTeacherCourse.message";
import { Button } from "@unidash/components/Button";
import { Toast } from "@unidash/utils/toast.util";

export function AddTeacherCourseItem({
  teacher,
  setTeachersOutsideOfCourse,
}: AddTeacherCourseItemProps) {
  const params = useParams();
  const router = useRouter();

  async function handleAddTeacherToCourse(teacherId: string) {
    try {
      await TeacherCourseCSService.setTeacherCourse({
        teacherId,
        courseId: params.courseId as string,
        teacherRole: TEACHER_ROLE.normalTeacher,
      });

      setTeachersOutsideOfCourse((currentState) =>
        currentState.filter(
          (teacherOutsideOfCourse) => teacherOutsideOfCourse.id !== teacherId
        )
      );

      Toast.success(SET_TEACHER_COURSE_SUCCESS_MESSAGE.addTeacherToCourse);

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
    <li
      className={`
        w-full flex items-center justify-between gap-6 
        p-2 hover:bg-table-active-row rounded-md cursor-pointer
      `}
      key={teacher.id}
      onClick={() => handleAddTeacherToCourse(teacher.id)}
    >
      <Avatar>
        <AvatarFallback>{Formatter.getInitials(teacher.name)}</AvatarFallback>
      </Avatar>

      <span>{teacher.name}</span>

      <span>{teacher.email}</span>

      <Button size="icon" type="button">
        <UserPlusIcon />
      </Button>
    </li>
  );
}
