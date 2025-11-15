export interface UseDebounceParams<T> {
  value: T;
  onDebounce: () => void;
  delay?: number;
}
