import { Badge } from "@unidash/components/Badge";
import { TeacherStatusProps } from "./teacherStatus.interface";

export function TeacherStatus({ isActive }: TeacherStatusProps) {
  return (
    <Badge
      className={`
            text-xs md:text-sm ${
              isActive
                ? "bg-icon-green text-icon-green-foreground"
                : "bg-icon-red text-icon-red-foreground"
            }
          `}
    >
      {isActive ? "Em atividade" : "Inativo"}
    </Badge>
  );
}
