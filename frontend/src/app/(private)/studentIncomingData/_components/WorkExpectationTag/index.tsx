import { Badge } from "@unidash/components/Badge";
import { WorkExpectationTagProps } from "./workExpectationTag.interface";
import { WORK_EXPECTATION } from "@unidash/api/dtos/studentIncomingData.dto";

const WORK_EXPECTATION_COLOR = {
  [WORK_EXPECTATION.academicCareer]: "bg-icon-blue text-icon-blue-foreground",
  [WORK_EXPECTATION.employmentContract]:
    "bg-icon-yellow text-icon-yellow-foreground",
  [WORK_EXPECTATION.independentContractor]:
    "bg-icon-orange text-icon-orange-foreground",
  [WORK_EXPECTATION.publicSector]: "bg-icon-purple text-icon-purple-foreground",
  [WORK_EXPECTATION.undecided]: "bg-icon-red text-icon-red-foreground",
} as const;

const WORK_EXPECTATION_LABEL = {
  [WORK_EXPECTATION.academicCareer]: "Academia",
  [WORK_EXPECTATION.employmentContract]: "CLT",
  [WORK_EXPECTATION.independentContractor]: "PJ",
  [WORK_EXPECTATION.publicSector]: "Setor público",
  [WORK_EXPECTATION.undecided]: "Indeciso",
} as const;

export function WorkExpectationTag({
  workExpectation,
}: WorkExpectationTagProps) {
  return (
    <Badge
      className={`text-xs md:text-sm ${WORK_EXPECTATION_COLOR[workExpectation]}`}
    >
      {WORK_EXPECTATION_LABEL[workExpectation]}
    </Badge>
  );
}
