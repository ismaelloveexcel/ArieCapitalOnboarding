import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  referenceNumber: text("reference_number").notNull().unique(),
  currentStage: integer("current_stage").notNull().default(0),
  status: text("status").notNull().default("in_progress"),
  entityData: jsonb("entity_data"),
  governanceData: jsonb("governance_data"),
  businessData: jsonb("business_data"),
  financialData: jsonb("financial_data"),
  documentationData: jsonb("documentation_data"),
  complianceScore: integer("compliance_score"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  submittedAt: timestamp("submitted_at"),
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;

export const agentMessages = pgTable("agent_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationId: varchar("application_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  stage: integer("stage"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAgentMessageSchema = createInsertSchema(agentMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertAgentMessage = z.infer<typeof insertAgentMessageSchema>;
export type AgentMessage = typeof agentMessages.$inferSelect;
