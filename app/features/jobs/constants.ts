export const JOB_TYPES = [
  {
    id: "full-time",
    name: "Full-time",
  },
  {
    id: "part-time",
    name: "Part-time",
  },
  {
    id: "contract",
    name: "Contract",
  },
  {
    id: "freelance",
    name: "Freelance",
  },
] as const;

export const JOB_LOCATIONS = [
  {
    id: "remote",
    name: "Remote",
  },
  {
    id: "onsite",
    name: "Onsite",
  },
  {
    id: "hybrid",
    name: "Hybrid",
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
