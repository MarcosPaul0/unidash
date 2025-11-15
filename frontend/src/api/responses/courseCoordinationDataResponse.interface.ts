import { Semester } from "../dtos/courseStudentsData.dto";

export interface CourseCoordinationDataResponse {
  courseCoordinationData: {
    id: string;
    year: number;
    semester: Semester;
    servicesRequestsBySystem: number;
    servicesRequestsByEmail: number;
    resolutionActions: number;
    administrativeDecisionActions: number;
    meetingsByBoardOfDirectors: number;
    meetingsByUndergraduateChamber: number;
    meetingsByCourseCouncil: number;
    meetingsByNde: number;
    academicActionPlans: string;
    administrativeActionPlans: string;
    createdAt: string;
  };
}

export interface CourseCoordinationListDataResponse {
  courseCoordinationData: {
    id: string;
    year: number;
    semester: Semester;
    servicesRequestsBySystem: number;
    servicesRequestsByEmail: number;
    resolutionActions: number;
    administrativeDecisionActions: number;
    meetingsByBoardOfDirectors: number;
    meetingsByUndergraduateChamber: number;
    meetingsByCourseCouncil: number;
    meetingsByNde: number;
    academicActionPlans: string;
    administrativeActionPlans: string;
    createdAt: string;
  }[];
  totalItems: number;
  totalPages: number;
}
