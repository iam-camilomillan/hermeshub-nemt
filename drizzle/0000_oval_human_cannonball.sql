ALTER TABLE "company" ADD COLUMN "public_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "company" ADD CONSTRAINT "company_public_id_unique" UNIQUE("public_id");