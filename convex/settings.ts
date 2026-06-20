import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getVal = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const match = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    return match ? match.value : null;
  },
});

export const setVal = mutation({
  args: { key: v.string(), value: v.string() },
  handler: async (ctx, args) => {
    const match = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    if (match) {
      await ctx.db.patch(match._id, { value: args.value });
    } else {
      await ctx.db.insert("settings", { key: args.key, value: args.value });
    }
  },
});

export const resetAll = mutation({
  args: {},
  handler: async (ctx) => {
    // Delete all waitlist items
    const waitlistItems = await ctx.db.query("waitlist").collect();
    for (const item of waitlistItems) {
      await ctx.db.delete(item._id);
    }

    // Delete all contact messages
    const contactItems = await ctx.db.query("contact_messages").collect();
    for (const item of contactItems) {
      await ctx.db.delete(item._id);
    }

    // Delete all roadmap steps
    const roadmapItems = await ctx.db.query("roadmap").collect();
    for (const item of roadmapItems) {
      await ctx.db.delete(item._id);
    }

    // Delete all research papers
    const researchItems = await ctx.db.query("research").collect();
    for (const item of researchItems) {
      await ctx.db.delete(item._id);
    }

    // Delete all founder profiles
    const founderItems = await ctx.db.query("founder_profile").collect();
    for (const item of founderItems) {
      await ctx.db.delete(item._id);
    }

    // Delete all settings
    const settingItems = await ctx.db.query("settings").collect();
    for (const item of settingItems) {
      await ctx.db.delete(item._id);
    }
  },
});
