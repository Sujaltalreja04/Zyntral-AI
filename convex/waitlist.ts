import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("waitlist").order("desc").collect();
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.string(),
    useCase: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("waitlist", {
      name: args.name,
      email: args.email,
      company: args.company,
      useCase: args.useCase,
      submittedAt: new Date().toLocaleString(),
      status: "Pending",
      apiKey: null,
    });
    return id;
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("waitlist"),
    status: v.string(),
    apiKey: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      apiKey: args.apiKey,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("waitlist") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const purge = mutation({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("waitlist").collect();
    for (const item of all) {
      await ctx.db.delete(item._id);
    }
  },
});
