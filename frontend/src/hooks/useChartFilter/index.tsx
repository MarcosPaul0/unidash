"use client";

import { useEffect, useState } from "react";
import { UseChartFilterParams } from "./useChartFilter.interface";

export function useChartFilter<T>({
  indicators,
  initialData,
}: UseChartFilterParams<T>) {
  const [activeFilterOption, setActiveFilterOption] = useState<null | string>(
    null
  );

  useEffect(() => {
    if (!indicators) {
      setActiveFilterOption(null);
      return;
    }

    const allFilterOptions = Object.keys(indicators).reverse();

    if (allFilterOptions.length > 0) {
      setActiveFilterOption(allFilterOptions[0]);
      return;
    }

    setActiveFilterOption(null);
  }, [indicators]);

  const options = indicators ? Object.keys(indicators).reverse() : [];

  const filterOptions = options.map((year) => ({
    label: year,
    value: year,
  }));

  const indicatorsData = activeFilterOption
    ? indicators![activeFilterOption as string]
    : initialData;

  return {
    indicatorsData,
    activeFilterOption,
    filterOptions,
    changeFilterOption: setActiveFilterOption,
  };
}
