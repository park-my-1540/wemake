import { bigint, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { JOB_TYPES, JOB_LOCATIONS, SALARY_RANGES } from "./constants";

export const jobTypes = pgEnum(
  "job_types",
  JOB_TYPES.map((type) => type.id) as [string, ...string[]]
);

export const jobLocations = pgEnum(
  "job_locations",
  JOB_LOCATIONS.map((location) => location.id) as [string, ...string[]]
);

export const salaryRanges = pgEnum("salary_ranges", SALARY_RANGES);

// snake case로 db column으로 쓰임
export const jobs = pgTable("jobs", {
  job_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  position: text().notNull(),
  overview: text().notNull(),
  responsibilities: text().notNull(),
  qualifications: text().notNull(),
  benefits: text().notNull(),
  skills: text().array().notNull(),
  company_name: text().notNull(),
  company_logo: text().notNull(),
  company_location: text().notNull(),
  company_url: text().notNull(),
  job_type: jobTypes().notNull(),
  job_location: jobLocations().notNull(),
  salary_range: salaryRanges().notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
