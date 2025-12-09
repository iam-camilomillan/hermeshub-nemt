/* Drizzle Imports */
import {
  text,
  boolean,
  timestamp,
  date,
  pgTable,
  pgTableCreator,
} from "drizzle-orm/pg-core";

/* Table Creator */
export const createTable = pgTableCreator((name) => `pg-drizzle_${name}`);

/* Vehicles Schema */
export const vehicle = pgTable("vehicle", {
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

/* Payer Schema */
export const payer = pgTable("payer", {
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

/* Company Schema */
export const company = pgTable("company", {
  id: text("id").primaryKey(),
  public_id: text("public_id").notNull().unique(),
  name: text("name").notNull(),

  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

/* BETTERAUTH SCHEMAS */
export const user = pgTable("user", {
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

export const session = pgTable("session", {
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

export const account = pgTable("account", {
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

export const verification = pgTable("verification", {
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
