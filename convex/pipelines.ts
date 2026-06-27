import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("pipelines").order("desc").collect();
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    provider: v.string(),
    model: v.string(),
    chunkSize: v.number(),
    chunkOverlap: v.number(),
    systemPrompt: v.string(),
    appType: v.optional(v.string()),
    scaleLimit: v.optional(v.string()),
    cloudTarget: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("pipelines", {
      name: args.name,
      description: args.description,
      provider: args.provider,
      model: args.model,
      chunkSize: args.chunkSize,
      chunkOverlap: args.chunkOverlap,
      systemPrompt: args.systemPrompt,
      createdAt: new Date().toLocaleString(),
      appType: args.appType,
      scaleLimit: args.scaleLimit,
      cloudTarget: args.cloudTarget,
    });
    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("pipelines"),
    name: v.string(),
    description: v.string(),
    provider: v.string(),
    model: v.string(),
    chunkSize: v.number(),
    chunkOverlap: v.number(),
    systemPrompt: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
      description: args.description,
      provider: args.provider,
      model: args.model,
      chunkSize: args.chunkSize,
      chunkOverlap: args.chunkOverlap,
      systemPrompt: args.systemPrompt,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("pipelines") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
