ALTER TABLE "test_user" ADD COLUMN "username" text NOT NULL;--> statement-breakpoint
ALTER TABLE "test_user" ADD CONSTRAINT "test_user_username_unique" UNIQUE("username");