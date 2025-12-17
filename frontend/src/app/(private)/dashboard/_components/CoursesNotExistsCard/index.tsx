import { CoursesNotExists } from "@unidash/assets/svgs/CoursesNotExists";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@unidash/components/Card";

export function CoursesNotExistsCard() {
  return (
    <Card className="max-w-3xl w-full flex-row items-center">
      <CardHeader className="flex-1">
        <CardTitle className="text-2xl">Nenhum curso cadastrado</CardTitle>

        <CardDescription className="text-xl">
          <p>Ainda não há cursos registrados no sistema.</p>
          <p>
            Para que os dados acadêmicos e indicadores sejam exibidos, é
            necessário que o administrador realize o cadastro dos cursos da
            universidade.
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <CoursesNotExists className="w-48 h-48" />
      </CardContent>
    </Card>
  );
}
