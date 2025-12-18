/* Drizzle Imports */
import {
  text,
  boolean,
  timestamp,
  date,
  time,
  pgTable,
  pgTableCreator,
} from "drizzle-orm/pg-core";

/* Table Creator */
export const createTable = pgTableCreator((name) => `pg-drizzle_${name}`);

/* Trips Schema */
export const trip = pgTable("trips", {
  id: text("id").primaryKey(),
  public_id: text("public_id").notNull().unique(),
  status: text("status").notNull().default("unassigned"),

  payer_trip_id: text("payer_trip_id").notNull(),
  date: date("date").notNull(),
  scheduled_pickup_time: time("scheduled_pickup_time"),
  actual_pickup_time: time("actual_pickup_time"),
  scheduled_dropoff_time: time("scheduled_dropoff_time"),
  actual_dropoff_time: time("actual_dropoff_time"),

  pickup_address: text("pickup_address").notNull(),
  pickup_location_name: text("pickup_location_name").notNull(),
  pickup_phone_number: text("pickup_phone_number").notNull(),
  dropoff_address: text("dropoff_address").notNull(),
  dropoff_location_name: text("dropoff_location_name").notNull(),
  dropoff_phone_number: text("dropoff_phone_number").notNull(),

  payer_passenger_id: text("payer_passenger_id").notNull(),
  passenger_first_name: text("passenger_first_name").notNull(),
  passenger_last_name: text("passenger_last_name").notNull(),
  passenger_phone_number: text("passenger_phone_number").notNull(),
  passenger_date_of_birth: date("passenger_date_of_birth"),

  level_of_service: text("level_of_service").notNull(),
  mileage: text("mileage").notNull(),

  notes: text("notes"),

  payer_id: text("payer_id").notNull(),

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),

  companyId: text("company_id")
    .notNull()
    .references(() => company.id),
});

/* Members Schema */
export const member = pgTable("members", {
  id: text("id").primaryKey(),
  public_id: text("public_id").notNull().unique(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  phone_number: text("phone_number").notNull(),
  additional_phone_number: text("additional_phone_number"),
  address: text("address"),
  address_location_type: text("address_location_type"),
  additional_address: text("additional_address"),
  additional_address_location_type: text("additional_address_location_type"),

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),

  companyId: text("company_id")
    .notNull()
    .references(() => company.id),
});

/* Vehicles Schema */
export const vehicle = pgTable("vehicles", {
  id: text("id").primaryKey(),
  public_id: text("public_id").notNull().unique(),
  status: text("status").notNull().default("active"),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: text("year").notNull(),
  vin: text("vin").notNull(),
  license_plate: text("license_plate").notNull(),
  color: text("color").notNull(),
  mileage: text("mileage").notNull(),
  registration_date: date("registration_date", { mode: "string" }).notNull(),
  registration_expiration_date: date("registration_expiration_date", {
    mode: "string",
  }).notNull(),
  level_of_service: text("level_of_service").notNull(),
  base_location: text("base_location").notNull(),

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),

  companyId: text("company_id")
    .notNull()
    .references(() => company.id),
});

/* Payers Schema */
export const payer = pgTable("payers", {
  id: text("id").primaryKey(),
  public_id: text("public_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  additional_email: text("additional_email"),
  phone_number: text("phone_number").notNull(),
  additional_phone_number: text("additional_phone_number"),
  label_color: text("label_color").notNull(),
  signature_at_pu: boolean("signature_at_pu").notNull().default(false),
  signature_at_do: boolean("signature_at_do").notNull().default(false),

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),

  companyId: text("company_id")
    .notNull()
    .references(() => company.id),
});

/* Companies Schema */
export const company = pgTable("companies", {
  id: text("id").primaryKey(),
  public_id: text("public_id").notNull().unique(),
  name: text("name").notNull(),

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

/* BetterAuth Schemas */
export const user = pgTable("users", {
  id: text("id").primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  displayUsername: text("display_username").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),

  role: text("role").notNull(),
  companyId: text("company_id")
    .notNull()
    .references(() => company.id),

  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("sessions", {
  id: text("id").primaryKey(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  userAgent: text("user_agent"),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const verification = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),

  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date(),
  ),
});
