import { AddTeacherCourseItem } from "../AddTeacherCourseItem";
import { AddTeacherCourseListProps } from "./addTeacherCourseList.interface";

export function AddTeacherCourseList({
  teachers,
  setTeachersOutsideOfCourse,
}: AddTeacherCourseListProps) {
  return (
    <ul className="w-full p-2">
      {teachers.map((teacher) => (
        <AddTeacherCourseItem
          key={teacher.id}
          teacher={teacher}
          setTeachersOutsideOfCourse={setTeachersOutsideOfCourse}
        />
      ))}
    </ul>
  );
}
