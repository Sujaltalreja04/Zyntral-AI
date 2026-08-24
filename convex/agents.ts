import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./adminAuth";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("agents").collect();
  },
});

export const add = mutation({
  args: {
    token: v.string(),
    name: v.string(),
    category: v.string(),
    description: v.string(),
    rating: v.number(),
    reviews: v.number(),
    price: v.string(),
    icon: v.string(),
    iconColor: v.string(),
    tags: v.array(v.string()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _token, ...agent } = args;
    return await ctx.db.insert("agents", agent);
  },
});

export const update = mutation({
  args: {
    token: v.string(),
    id: v.id("agents"),
    name: v.optional(v.string()),
    category: v.optional(v.string()),
    description: v.optional(v.string()),
    rating: v.optional(v.number()),
    reviews: v.optional(v.number()),
    price: v.optional(v.string()),
    icon: v.optional(v.string()),
    iconColor: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _token, id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("agents") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});

export const seed = mutation({
  args: {
    agents: v.array(
      v.object({
        name: v.string(),
        category: v.string(),
        description: v.string(),
        rating: v.number(),
        reviews: v.number(),
        price: v.string(),
        icon: v.string(),
        iconColor: v.string(),
        tags: v.array(v.string()),
        status: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("agents").collect();
    if (existing.length === 0) {
      for (const agent of args.agents) {
        await ctx.db.insert("agents", agent);
      }
    }
  },
});
