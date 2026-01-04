ALTER TABLE "payers" ADD COLUMN "mapping_json" text;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "vehicle_id" text;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "driver_id" text;