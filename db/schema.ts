import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
    id: serial("id").primaryKey(),
    code: text("code").notNull().unique(),
    targetUrl: text("target_url").notNull(),
    totalClicks: integer("total_clicks").default(0),
    lastClickedAt: timestamp("last_clicked_at"),
    createdAt: timestamp("created_at").defaultNow()
})