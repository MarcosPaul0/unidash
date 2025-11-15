import { SelectCourse } from "@unidash/assets/svgs/SelectCourse";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@unidash/components/Card";

export function CourseNotSelectedCard() {
  return (
    <Card className="max-w-3xl w-full flex-row items-center">
      <CardHeader className="flex-1">
        <CardTitle className="text-2xl">👆 Selecione um curso</CardTitle>

        <CardDescription className="text-xl">
          Para visualizar os indicadores e gráficos, escolha um curso na barra
          de seleção acima.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SelectCourse className="w-48 h-48" />
      </CardContent>
    </Card>
  );
}
