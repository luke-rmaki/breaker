import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const breaker = sqliteTable("breaker", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	created_at: integer("created_at", { mode: "timestamp" })
		.defaultNow()
		.notNull(),
	updated_at: integer("updated_at", { mode: "timestamp" })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	user_id: text("user_id")
		.references(() => user.id, { onDelete: "cascade" }),
	support_id: text("support_id")
		.references(() => user.id, { onDelete: "set null" }),
});

export const classification = sqliteTable("classification", {
	id: text("id").primaryKey(),
	breaker_id: text("breaker_id")
		.notNull()
		.references(() => breaker.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	emoji: text("emoji"),
	level: integer("level").notNull(),
	description: text("description"),
});

export const day = sqliteTable("day", {
	id: text("id").primaryKey(),
	breaker_id: text("breaker_id")
		.notNull()
		.references(() => breaker.id, { onDelete: "cascade" }),
	date: integer("date", { mode: "timestamp" }).notNull(),
	notes: text("notes"),
	classification_id: text("classification_id")
		.references(() => classification.id, { onDelete: "set null" }),
});

export const motivation = sqliteTable("motivation", {
	id: text("id").primaryKey(),
	breaker_id: text("breaker_id")
		.notNull()
		.references(() => breaker.id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	description: text("description"),
	picture: text("picture"),
});

export const notification = sqliteTable("notification", {
	id: text("id").primaryKey(),
	breaker_id: text("breaker_id")
		.notNull()
		.references(() => breaker.id, { onDelete: "cascade" }),
	message: text("message").notNull(),
	recepient_id: text("recipient_id")
		.notNull()
		.references(() => user.id, { onDelete: "set null" }),
	time: integer("time", { mode: "timestamp" }).notNull(),
});

// !============ AUTH SCHEMA ============
export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: integer("email_verified", { mode: "boolean" })
		.default(false)
		.notNull(),
	image: text("image"),
	createdAt: integer("created_at", { mode: "timestamp" })
		.defaultNow()
		.notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	type: text("type").notNull().default('user'), // 'user' | 'support'
	profilePicture: text("profile_picture"),
});

export const session = sqliteTable("session", {
	id: text("id").primaryKey(),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
	token: text("token").notNull().unique(),
	createdAt: integer("created_at", { mode: "timestamp" })
		.defaultNow()
		.notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: integer("access_token_expires_at", {
		mode: "timestamp",
	}),
	refreshTokenExpiresAt: integer("refresh_token_expires_at", {
		mode: "timestamp",
	}),
	scope: text("scope"),
	password: text("password"),
	createdAt: integer("created_at", { mode: "timestamp" })
		.defaultNow()
		.notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const verification = sqliteTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
	createdAt: integer("created_at", { mode: "timestamp" })
		.defaultNow()
		.notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});
