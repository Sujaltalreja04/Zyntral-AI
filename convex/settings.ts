import { ConvexError } from "convex/values";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin, newSessionExpiry } from "./adminAuth";

const DEFAULT_PASSCODE = "zyntral2026";

export const getVal = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    // The passcode itself must never be sent to the client, otherwise
    // anyone loading the admin page could read it straight off the wire.
    if (args.key === "passcode") {
      return null;
    }
    const match = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    return match ? match.value : null;
  },
});

export const login = mutation({
  args: { passcode: v.string() },
  handler: async (ctx, args) => {
    const match = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "passcode"))
      .first();
    const currentPasscode = match ? match.value : DEFAULT_PASSCODE;

    if (args.passcode !== currentPasscode) {
      throw new ConvexError("Invalid passcode");
    }

    const token = crypto.randomUUID();
    await ctx.db.insert("admin_sessions", {
      token,
      expiresAt: newSessionExpiry(),
    });
    return token;
  },
});

export const validateSession = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("admin_sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    return !!session && session.expiresAt > Date.now();
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("admin_sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    if (session) {
      await ctx.db.delete(session._id);
    }
  },
});

export const setVal = mutation({
  args: { token: v.string(), key: v.string(), value: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
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
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);

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
