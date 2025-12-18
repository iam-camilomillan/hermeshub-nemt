ALTER TABLE "trips" ALTER COLUMN "status" SET DEFAULT 'unassigned';--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "scheduled_pickup_time" time;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "actual_pickup_time" time;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "scheduled_dropoff_time" time;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "actual_dropoff_time" time;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "pickup_address" text NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "pickup_location_type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "dropoff_address" text NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "dropoff_location_type" text NOT NULL;