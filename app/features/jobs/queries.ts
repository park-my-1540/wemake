import client from "~/supa-client";

export const getJobs = async ({
  limit,
  location,
  type,
  salary,
}: {
  limit: number;
  location?: string;
  type?: string;
  salary?: string;
}) => {
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
