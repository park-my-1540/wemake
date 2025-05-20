import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "database.types";
import type {
  JobTypeId,
  JobLocationId,
  SalaryType,
} from "~/features/jobs/constants";

export const getJobs = async (
  client: SupabaseClient,
  {
    limit,
    location,
    type,
    salary,
  }: {
    limit: number;
    location?: JobLocationId;
    type?: JobTypeId;
    salary?: SalaryType;
  }
) => {
  const baseQuery = client
    .from("jobs")
    .select(
      `
    job_id,
    position,
    overview,
    company_name,
    company_logo,
    company_location,
    job_type,
    job_location,
    salary_range,
    created_at
    `
    )
    .limit(limit);

  if (location) {
    baseQuery.eq("job_location", location);
  }
  if (type) {
    baseQuery.eq("job_type", type);
  }
  if (salary) {
    baseQuery.eq("salary_range", salary);
  }

  const { data, error } = await baseQuery;

  if (error) {
    throw error;
  }

  return data;
};

export const getJobById = async (
  client: SupabaseClient,
  { jobId }: { jobId: number }
) => {
  const { data, error } = await client
    .from("jobs")
    .select("*")
    .eq("job_id", jobId)
    .single();
  if (error) throw error;
  return data;
};
