import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@unidash/components/Card";
import { CardChartProps } from "./cardChartProps.interface";

export function ChartCard({
  children,
  description,
  title,
  className,
  complement,
}: CardChartProps) {
  return (
    <Card className={className}>
      <CardHeader className="relative">
        <CardTitle className={complement ? "mr-28" : ""}>{title}</CardTitle>

        <CardDescription>{description}</CardDescription>

        {complement}
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}
