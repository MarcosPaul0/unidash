import { Badge } from "@unidash/components/Badge";
import { SemesterTagProps } from "./semesterTag.interface";
import { SEMESTER } from "@unidash/api/dtos/courseStudentsData.dto";

const SEMESTER_COLOR = {
  [SEMESTER.first]: "bg-icon-yellow text-icon-yellow-foreground",
  [SEMESTER.second]: "bg-icon-blue text-icon-blue-foreground",
} as const;

const SEMESTER_LABEL = {
  [SEMESTER.first]: "Primeiro semestre",
  [SEMESTER.second]: "Segundo semestre",
} as const;

export function SemesterTag({ semester }: SemesterTagProps) {
  return (
    <Badge className={`text-xs md:text-sm ${SEMESTER_COLOR[semester]}`}>
      {SEMESTER_LABEL[semester]}
    </Badge>
  );
}
