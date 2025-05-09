-- ALTER TABLE "gpt_ideas" RENAME COLUMN "idea_id" TO "gpt_idea_id";--> statement-breakpoint
-- ALTER TABLE "gpt_ideas_likes" DROP CONSTRAINT "gpt_ideas_likes_gpt_idea_id_gpt_ideas_idea_id_fk";
--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "job_location" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."job_locations";--> statement-breakpoint
CREATE TYPE "public"."job_locations" AS ENUM('remote', 'onsite', 'hybrid');--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "job_location" SET DATA TYPE "public"."job_locations" USING "job_location"::"public"."job_locations";--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "job_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."job_types";--> statement-breakpoint
CREATE TYPE "public"."job_types" AS ENUM('full-time', 'part-time', 'contract', 'freelance');--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "job_type" SET DATA TYPE "public"."job_types" USING "job_type"::"public"."job_types";--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "team_leader_id" uuid;--> statement-breakpoint
ALTER TABLE "gpt_ideas_likes" ADD CONSTRAINT "gpt_ideas_likes_gpt_idea_id_gpt_ideas_gpt_idea_id_fk" FOREIGN KEY ("gpt_idea_id") REFERENCES "public"."gpt_ideas"("gpt_idea_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "team_team_leader_id_profiles_profile_id_fk" FOREIGN KEY ("team_leader_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;