export const JOB_TYPES = [
  {
    id: "full-time",
    name: "정규직",
  },
  {
    id: "part-time",
    name: "아르바이트",
  },
  {
    id: "contract",
    name: "계약직",
  },
  {
    id: "freelance",
    name: "프리랜서",
  },
] as const;

export const JOB_LOCATIONS = [
  {
    id: "remote",
    name: "재택근무",
  },
  {
    id: "onsite",
    name: "출근근무",
  },
  {
    id: "hybrid",
    name: "혼합근무",
  },
] as const;

export const SALARY_RANGES = [
  "$0 - $50,000",
  "$50,000 - $100,000",
  "$100,000 - $150,000",
  "$150,000 - $200,000",
  "$200,000 - $250,000",
  "$250,000 - $300,000",
  "$300,000+",
] as const;

export type SalaryType = (typeof SALARY_RANGES)[number];
export type JobTypeId = (typeof JOB_TYPES)[number]["id"];

export const JOB_TYPE_MAP: Map<JobTypeId, string> = new Map(
  JOB_TYPES.map((type) => [type.id, type.name])
);

export type JobLocationId = (typeof JOB_LOCATIONS)[number]["id"];

export const JOB_LOCATION_MAP: Map<JobLocationId, string> = new Map(
  JOB_LOCATIONS.map((loc) => [loc.id, loc.name])
);

export const JOB_TYPE_IDS = [
  "full-time",
  "part-time",
  "contract",
  "freelance",
] as const;

export const JOB_LOCATION_IDS = ["remote", "onsite", "hybrid"] as const;

type ObjectUnion<T extends { [key: string]: unknown }> = keyof T;
type ArrayUnion<T extends ReadonlyArray<any>> = T[number];
export type ValueOfUnion<T> = T extends { [key: string]: unknown }
  ? ObjectUnion<T>
  : T extends ReadonlyArray<any>
    ? ArrayUnion<T>
    : never;
