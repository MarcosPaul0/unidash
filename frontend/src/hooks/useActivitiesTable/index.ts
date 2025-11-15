import { UseActivitiesTableParams } from "./useActivitiesTable.interface";

interface ActivitiesByYear {
  activity: string;
  activitiesByYear: number[];
}

export function useActivitiesTable({ data, labels }: UseActivitiesTableParams) {
  const activities = data ? Object.entries(data) : [];

  const activitiesByYear = activities.reduce(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (accumulator, [year, activities]) => {
      activities.data.forEach((activitiesData, index) => {
        const hasIndexValue = accumulator[index];

        if (hasIndexValue) {
          accumulator[index].activitiesByYear = [
            ...accumulator[index].activitiesByYear,
            activitiesData.total,
          ];
        } else {
          accumulator.push({
            activity: labels[activitiesData.type] ?? activitiesData.type,
            activitiesByYear: [activitiesData.total],
          });
        }
      });

      return accumulator;
    },
    [] as ActivitiesByYear[]
  );

  return {
    activities,
    activitiesByYear,
  };
}
