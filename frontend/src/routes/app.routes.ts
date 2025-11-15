export const APP_ROUTES = {
  private: {
    dashboard: "/dashboard",

    courses: "/course/list",
    editCourse: "/course/edit/",
    registerCourse: "/course/register",
    courseTeachers: "/course/teachers/",

    student: "/student/list/",
    editStudent: "/student/edit/",
    registerStudent: "/student/register",

    teachers: "/teacher/list",
    editTeacher: "/teacher/edit/",
    registerTeacher: "/teacher/register",

    courseStudentsData: "/courseStudentsData/list/",
    registerCourseStudentsData: "/courseStudentsData/register",
    editCourseStudentsData: "/courseStudentsData/edit/",

    courseActiveStudentsData: "/courseActiveStudentsData/list/",
    registerCourseActiveStudentsData: "/courseActiveStudentsData/register",
    editCourseActiveStudentsData: "/courseActiveStudentsData/edit/",

    courseRegistrationLockData: "/courseRegistrationLockData/list/",
    registerCourseRegistrationLockData: "/courseRegistrationLockData/register",
    editCourseRegistrationLockData: "/courseRegistrationLockData/edit/",

    courseCoordinationData: "/courseCoordinationData/list/",
    registerCourseCoordinationData: "/courseCoordinationData/register",
    editCourseCoordinationData: "/courseCoordinationData/edit/",

    courseDepartureData: "/courseDepartureData/list/",
    registerCourseDepartureData: "/courseDepartureData/register",
    editCourseDepartureData: "/courseDepartureData/edit/",

    courseTeacherWorkloadData: "/courseTeacherWorkloadData/list/",
    registerCourseTeacherWorkloadData: "/courseTeacherWorkloadData/register/",
    editCourseTeacherWorkloadData: "/courseTeacherWorkloadData/edit/",

    courseCompletionWorkData: "/courseCompletionWorkData/list/",
    registerCourseCompletionWorkData: "/courseCompletionWorkData/register",
    editCourseCompletionWorkData: "/courseCompletionWorkData/edit/",

    teacherSupervisedCompletionWorkData:
      "/teacherSupervisedCompletionWorkData/list/",
    registerTeacherSupervisedCompletionWorkData:
      "/teacherSupervisedCompletionWorkData/register",

    teacherResearchAndExtensionProjectsData:
      "/teacherResearchAndExtensionProjectsData/list/",
    registerTeacherResearchAndExtensionProjectsData:
      "/teacherResearchAndExtensionProjectsData/register",

    teacherTechnicalScientificProductionsData:
      "/teacherTechnicalScientificProductionsData/list/",
    registerTeacherTechnicalScientificProductionsData:
      "/teacherTechnicalScientificProductionsData/register",

    courseTeachingComplementaryActivitiesData:
      "/courseTeachingComplementaryActivitiesData/list/",
    registerCourseTeachingComplementaryActivitiesData:
      "/courseTeachingComplementaryActivitiesData/register",
    editCourseTeachingComplementaryActivitiesData:
      "/courseTeachingComplementaryActivitiesData/edit/",

    courseSearchComplementaryActivitiesData:
      "/courseSearchComplementaryActivitiesData/list/",
    registerCourseSearchComplementaryActivitiesData:
      "/courseSearchComplementaryActivitiesData/register",
    editCourseSearchComplementaryActivitiesData:
      "/courseSearchComplementaryActivitiesData/edit/",

    courseExtensionComplementaryActivitiesData:
      "/courseExtensionComplementaryActivitiesData/list/",
    registerCourseExtensionComplementaryActivitiesData:
      "/courseExtensionComplementaryActivitiesData/register",
    editCourseExtensionComplementaryActivitiesData:
      "/courseExtensionComplementaryActivitiesData/edit/",

    courseExtensionActivitiesData: "/courseExtensionActivitiesData/list/",
    registerCourseExtensionActivitiesData:
      "/courseExtensionActivitiesData/register",
    editCourseExtensionActivitiesData: "/courseExtensionActivitiesData/edit/",

    courseInternshipData: "/courseInternshipData/list/",
    registerCourseInternshipData: "/courseInternshipData/register/",
    editCourseInternshipData: "/courseInternshipData/edit/",

    studentIncomingData: "/studentIncomingData/list/",
    registerStudentIncomingData: "/studentIncomingData/register/",

    studentEgressIndicator: "/studentEgressIndicator/list",
    registerStudentEgressIndicator: "/studentEgressIndicator/register",
  },
  public: {
    landingPage: "/",
    login: "/login",
    forgotPassword: "/forgot-password",
    recoverPassword: "/recover-password",
  },
} as const;
