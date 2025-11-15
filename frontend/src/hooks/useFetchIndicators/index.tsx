import { useCourseStore } from "@unidash/store/course.store";
import { useEffect, useState } from "react";
import { UseFetchIndicatorsParams } from "./useFetchIndicators.interface";

export function useFetchIndicators<T>({
  fetchIndicators,
}: UseFetchIndicatorsParams<T>) {
  const [indicators, setIndicators] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  const { activeCourse, courses } = useCourseStore();

  useEffect(() => {
    setIsFetching(true);

    if (courses.length === 0) {
      return;
    }

    if (!activeCourse) {
      setIsFetching(false);
      return;
    }

    (async () => {
      try {
        const indicatorsResponse = await fetchIndicators(activeCourse.id, {
          semester: null,
          yearFrom: null,
          yearTo: null,
        });

        setIndicators(indicatorsResponse);
        setIsFetching(false);
      } catch {
        setIndicators(null);
        setIsFetching(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCourse, courses]);

  return {
    indicators,
    isFetching,
    courseIsSelected: Boolean(activeCourse),
    hasIndicator: Boolean(indicators),
  };
}
