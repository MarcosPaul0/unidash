export interface UseChartFilterParams<T> {
  indicators?: Record<string, T>;
  initialData: T;
}
