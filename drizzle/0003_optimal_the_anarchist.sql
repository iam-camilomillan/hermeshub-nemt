ALTER TABLE "vehicle" ADD COLUMN "status" text DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicle" ADD COLUMN "make" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicle" ADD COLUMN "model" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicle" ADD COLUMN "year" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicle" ADD COLUMN "vin" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicle" ADD COLUMN "license_plate" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicle" ADD COLUMN "color" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicle" ADD COLUMN "mileage" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicle" ADD COLUMN "registration_date" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicle" ADD COLUMN "registration_expiration_date" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicle" ADD COLUMN "level_of_service" text NOT NULL;--> statement-breakpoint
ALTER TABLE "vehicle" ADD COLUMN "base_location" text NOT NULL;