import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("contact_messages").order("desc").collect();
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contact_messages", {
      name: args.name,
      email: args.email,
      subject: args.subject,
      message: args.message,
      submittedAt: new Date().toLocaleString(),
      status: "Unread",
    });
    return id;
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("contact_messages"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("contact_messages") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
