export interface CourseResponse {
  course: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CoursesResponse {
  courses: CourseResponse["course"][];
}
