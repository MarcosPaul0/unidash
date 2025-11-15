import { Badge } from "@unidash/components/Badge";
import { StudentTypeProps } from "./teacherStatus.interface";
import { STUDENT_TYPE } from "@unidash/api/responses/student.response";

const STUDENT_TYPE_COLOR = {
  [STUDENT_TYPE.incomingStudent]: "bg-icon-orange text-icon-orange-foreground",
  [STUDENT_TYPE.outgoingStudent]: "bg-icon-purple text-icon-purple-foreground",
} as const;

const STUDENT_TYPE_LABEL = {
  [STUDENT_TYPE.incomingStudent]: "Ingressante",
  [STUDENT_TYPE.outgoingStudent]: "Egressante",
} as const;

export function StudentType({ type }: StudentTypeProps) {
  return (
    <Badge className={`text-xs md:text-sm ${STUDENT_TYPE_COLOR[type]}`}>
      {STUDENT_TYPE_LABEL[type]}
    </Badge>
  );
}
