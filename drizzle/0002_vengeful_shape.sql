ALTER TABLE "payer" DROP CONSTRAINT "payer_email_unique";--> statement-breakpoint
ALTER TABLE "payer" DROP CONSTRAINT "payer_additional_email_unique";--> statement-breakpoint
ALTER TABLE "payer" DROP CONSTRAINT "payer_phone_number_unique";--> statement-breakpoint
ALTER TABLE "payer" DROP CONSTRAINT "payer_additional_phone_number_unique";--> statement-breakpoint
ALTER TABLE "payer" ALTER COLUMN "signature_at_pu" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "payer" ALTER COLUMN "signature_at_do" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "company_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "company_id" SET NOT NULL;