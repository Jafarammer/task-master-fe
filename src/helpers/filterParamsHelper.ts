export enum ParamsFilter {
  ALL = "all",
  COMPLETED = "completed",
  PENDING = "pending",
}

export const parseParams = (value: string | null): ParamsFilter => {
  if (!value) return ParamsFilter.ALL;

  return Object.values(ParamsFilter).includes(value as ParamsFilter)
    ? (value as ParamsFilter)
    : ParamsFilter.ALL;
};
