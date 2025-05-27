import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { formSchema } from "./pages/submit-job-page";
import type { JobLocationId, JobTypeId } from "~/features/jobs/constants";

export const createJob = async (
  client: SupabaseClient,
  data: z.infer<typeof formSchema>
) => {
  const { data: jobData, error } = await client
    .from("jobs")
    .insert({
      position: data.position,
      overview: data.overview,
      responsibilities: data.responsibilities,
      qualifications: data.qualifications,
      benefits: data.benefits,
      skills: data.skills,
      company_name: data.companyName,
      company_logo: data.companyLogoUrl,
      company_location: data.companyLocation,
      company_url: data.applyUrl,
      job_type: data.jobType as JobTypeId,
      job_location: data.jobLocation as JobLocationId,
      salary_range: data.salaryRange,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }
  return jobData;
};
