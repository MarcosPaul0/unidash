import { Topic } from "../../../_components/Topic";
import { ExtensionActivitiesTable } from "../ExtensionActivitiesTable";
import { ExtensionComplementaryActivitiesTable } from "../ExtensionComplementaryActivitiesTable";

import { SearchComplementaryActivitiesTable } from "../SearchComplementaryActivitiesTable";
import { TeachingComplementaryActivitiesTable } from "../TeachingComplementaryActivitiesTable";
import { ActivitiesIndicatorsProps } from "./activitiesIndicators.interface";

export function ActivitiesIndicators({
  indicators,
}: ActivitiesIndicatorsProps) {
  return (
    <>
      <Topic title="Indicadores de Atividades Complementares" />

      <ExtensionComplementaryActivitiesTable
        extensionComplementaryActivities={
          indicators?.extensionComplementaryActivities
        }
      />

      {/* <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-8">
        <RegistrationByTypeOfExtensionComplementaryActivity
          extensionComplementaryActivities={
            indicators?.extensionComplementaryActivities
          }
        />
      </div> */}

      <TeachingComplementaryActivitiesTable
        teachingComplementaryActivities={
          indicators?.teachingComplementaryActivities
        }
      />

      {/* <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-8">
        <RegistrationByTypeOfTeachingComplementaryActivity
          teachingComplementaryActivities={
            indicators?.teachingComplementaryActivities
          }
        />
      </div> */}

      <SearchComplementaryActivitiesTable
        searchComplementaryActivities={
          indicators?.searchComplementaryActivities
        }
      />

      {/* <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-8">
        <RegistrationByTypeOfSearchComplementaryActivity
          searchComplementaryActivities={
            indicators?.searchComplementaryActivities
          }
        />
      </div> */}

      <Topic title="Indicadores de Atividades de Extensão" />

      <ExtensionActivitiesTable
        extensionActivities={indicators?.extensionActivities}
      />

      {/* <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-8">
        <RegistrationByTypeOfExtensionActivity
          extensionActivities={indicators?.extensionActivities}
        />
      </div> */}
    </>
  );
}
