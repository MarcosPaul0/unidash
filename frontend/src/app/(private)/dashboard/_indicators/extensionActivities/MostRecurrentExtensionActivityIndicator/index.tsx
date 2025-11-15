import { StudentIcon } from "@phosphor-icons/react/dist/ssr";
import { IndicatorCard } from "../../../_components/IndicatorCard";

export function MostRecurrentExtensionActivityIndicator() {
  return (
    <IndicatorCard
      icon={<StudentIcon />}
      title="Atividade mais recorrente"
      value="Projetos especiais"
      variant="blue"
      size="md"
    />
  );
}
