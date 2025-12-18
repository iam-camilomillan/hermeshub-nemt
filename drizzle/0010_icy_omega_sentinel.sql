ALTER TABLE "trips" RENAME COLUMN "pickup_location_type" TO "pickup_location_name";--> statement-breakpoint
ALTER TABLE "trips" RENAME COLUMN "dropoff_location_type" TO "dropoff_location_name";--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "payer_trip_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "pickup_phone_number" text NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "dropoff_phone_number" text NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "payer_passenger_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "passenger_first_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "passenger_last_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "passenger_phone_number" text NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "passenger_date_of_birth" date;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "level_of_service" text NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "mileage" text NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "payer_id" text NOT NULL;