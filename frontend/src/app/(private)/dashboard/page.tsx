import { Tabs, TabsContent } from "@unidash/components/Tabs";
import { Toolbar } from "../_components/Toolbar";
import { CourseContent } from "./_contents/CourseContent";
import { IngressContent } from "./_contents/IngressContent";
import { CoordinationContent } from "./_contents/CoordinationContent";
import { ConclusionContent } from "./_contents/ConclusionContent/inidex";
import { ActivitiesContent } from "./_contents/ActivitiesContent";
import { InternshipsContent } from "./_contents/InternshipsContent";
import { ProductionsContent } from "./_contents/ProductionsContent";
import { ChartTabsList } from "./_components/ChartTabsList";
import { CHARTS_CATEGORIES } from "./_components/ChartTabsList/chartsTabsList.constant";
import { DashboardDialogs } from "./_components/DashboardDialogs";

export default function DashboardPage() {
  return (
    <>
      <Tabs defaultValue={CHARTS_CATEGORIES.COURSE}>
        <Toolbar>
          <ChartTabsList />
        </Toolbar>

        <TabsContent
          value={CHARTS_CATEGORIES.COURSE}
          className="flex flex-col gap-4 md:gap-8"
        >
          <CourseContent />
        </TabsContent>

        <TabsContent
          value={CHARTS_CATEGORIES.COORDINATION}
          className="flex flex-col gap-4 md:gap-8"
        >
          <CoordinationContent />
        </TabsContent>

        <TabsContent
          value={CHARTS_CATEGORIES.INGRESS}
          className="flex flex-col gap-4 md:gap-8"
        >
          <IngressContent />
        </TabsContent>

        <TabsContent
          value={CHARTS_CATEGORIES.CONCLUSION}
          className="flex flex-col gap-4 md:gap-8"
        >
          <ConclusionContent />
        </TabsContent>

        <TabsContent
          value={CHARTS_CATEGORIES.ACTIVITIES}
          className="flex flex-col gap-4 md:gap-8"
        >
          <ActivitiesContent />
        </TabsContent>

        <TabsContent
          value={CHARTS_CATEGORIES.INTERNSHIPS}
          className="flex flex-col gap-4 md:gap-8"
        >
          <InternshipsContent />
        </TabsContent>

        <TabsContent
          value={CHARTS_CATEGORIES.PRODUCTIONS}
          className="flex flex-col gap-4 md:gap-8"
        >
          <ProductionsContent />
        </TabsContent>
      </Tabs>

      <DashboardDialogs />
    </>
  );
}
