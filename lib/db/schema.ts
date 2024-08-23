import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  message: text('message'),
  phone: varchar('phone',{length:255}),
  created_at: timestamp('created_at').defaultNow(),
});