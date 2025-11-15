import { Badge } from "@unidash/components/Badge";
import { EmploymentTypeTagProps } from "./employmentTypeTag.interface";
import { EMPLOYMENT_TYPE } from "@unidash/api/dtos/courseInternshipData.dto";

const EMPLOYMENT_TYPE_COLOR = {
  [EMPLOYMENT_TYPE.employmentContract]:
    "bg-icon-yellow text-icon-yellow-foreground",
  [EMPLOYMENT_TYPE.independentContractor]:
    "bg-icon-purple text-icon-purple-foreground",
  [EMPLOYMENT_TYPE.internship]: "bg-icon-blue text-icon-blue-foreground",
} as const;

const EMPLOYMENT_TYPE_LABEL = {
  [EMPLOYMENT_TYPE.employmentContract]: "CLT",
  [EMPLOYMENT_TYPE.independentContractor]: "PJ",
  [EMPLOYMENT_TYPE.internship]: "Estágio",
} as const;

export function EmploymentTypeTag({ employmentType }: EmploymentTypeTagProps) {
  return (
    <Badge
      className={`text-xs md:text-sm ${EMPLOYMENT_TYPE_COLOR[employmentType]}`}
    >
      {EMPLOYMENT_TYPE_LABEL[employmentType]}
    </Badge>
  );
}
