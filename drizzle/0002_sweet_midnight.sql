ALTER TABLE "test_account" RENAME TO "account";--> statement-breakpoint
ALTER TABLE "tests_session" RENAME TO "session";--> statement-breakpoint
ALTER TABLE "test_user" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "test_verification" RENAME TO "verification";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "test_user_username_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "test_user_email_unique";--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "tests_session_token_unique";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "test_account_user_id_test_user_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "tests_session_user_id_test_user_id_fk";
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_token_unique" UNIQUE("token");