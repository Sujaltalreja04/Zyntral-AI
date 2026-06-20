import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("roadmap")
      .collect();
  },
});

export const seed = mutation({
  args: {
    steps: v.array(
      v.object({
        phase: v.string(),
        status: v.string(),
        statusColor: v.string(),
        badgeBg: v.string(),
        desc: v.string(),
        icon: v.string(),
        orderIndex: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("roadmap").collect();
    if (existing.length === 0) {
      for (const step of args.steps) {
        await ctx.db.insert("roadmap", step);
      }
    }
  },
});

export const add = mutation({
  args: {
    phase: v.string(),
    status: v.string(),
    statusColor: v.string(),
    badgeBg: v.string(),
    desc: v.string(),
    icon: v.string(),
    orderIndex: v.number(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("roadmap", args);
    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("roadmap"),
    phase: v.string(),
    status: v.string(),
    statusColor: v.string(),
    badgeBg: v.string(),
    desc: v.string(),
    icon: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      phase: args.phase,
      status: args.status,
      statusColor: args.statusColor,
      badgeBg: args.badgeBg,
      desc: args.desc,
      icon: args.icon,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("roadmap") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const reorder = mutation({
  args: {
    orderedIds: v.array(v.id("roadmap")),
  },
  handler: async (ctx, args) => {
    // Overwrite the orderIndex of each item based on its position in the list
    for (let i = 0; i < args.orderedIds.length; i++) {
      await ctx.db.patch(args.orderedIds[i], { orderIndex: i });
    }
  },
});
