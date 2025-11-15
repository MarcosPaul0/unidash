import { TabsList, TabsTrigger } from "@unidash/components/Tabs";
import { CHARTS_CATEGORIES } from "./chartsTabsList.constant";
import { ScrollArea, ScrollBar } from "@unidash/components/ScrollArea";

export function ChartTabsList() {
  return (
    <ScrollArea className="w-[calc(100%---spacing(1))] md:h-13 md:top-1">
      <TabsList className="overflow-y-clip md:overflow-y-visible">
        <TabsTrigger value={CHARTS_CATEGORIES.COURSE}>Curso</TabsTrigger>

        <TabsTrigger value={CHARTS_CATEGORIES.COORDINATION}>
          Coordenação
        </TabsTrigger>

        <TabsTrigger value={CHARTS_CATEGORIES.INGRESS}>Ingressos</TabsTrigger>

        <TabsTrigger value={CHARTS_CATEGORIES.CONCLUSION}>TCC</TabsTrigger>

        <TabsTrigger value={CHARTS_CATEGORIES.ACTIVITIES}>
          Atividades
        </TabsTrigger>

        <TabsTrigger value={CHARTS_CATEGORIES.INTERNSHIPS}>
          Estágios
        </TabsTrigger>

        <TabsTrigger value={CHARTS_CATEGORIES.PRODUCTIONS}>
          Produções
        </TabsTrigger>
      </TabsList>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
