CREATE TYPE "public"."job_locations" AS ENUM('Remote', 'Onsite', 'Hybrid');--> statement-breakpoint
CREATE TYPE "public"."job_types" AS ENUM('Full-time', 'Part-time', 'Contract', 'Freelance');--> statement-breakpoint
CREATE TYPE "public"."salary_ranges" AS ENUM('$0 - $50,000', '$50,000 - $100,000', '$100,000 - $150,000', '$150,000 - $200,000', '$200,000 - $250,000', '$250,000 - $300,000', '$300,000+');--> statement-breakpoint
CREATE TABLE "jobs" (
	"job_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "jobs_job_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"position" text NOT NULL,
	"overview" text NOT NULL,
	"responsibilities" text NOT NULL,
	"qualifications" text NOT NULL,
	"benefits" text NOT NULL,
	"skills" text[] NOT NULL,
	"company_name" text NOT NULL,
	"company_logo" text NOT NULL,
	"company_location" text NOT NULL,
	"company_url" text NOT NULL,
	"job_type" "job_types" NOT NULL,
	"job_location" "job_locations" NOT NULL,
	"salary_range" "salary_ranges" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
