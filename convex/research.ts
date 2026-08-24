import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./adminAuth";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("research").collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const targetPath = `/research/${args.slug}`;
    const match = await ctx.db
      .query("research")
      .filter((q) => q.eq(q.field("path"), targetPath))
      .first();
    return match;
  },
});

export const seed = mutation({
  args: {
    articles: v.array(
      v.object({
        category: v.string(),
        title: v.string(),
        desc: v.string(),
        date: v.string(),
        path: v.string(),
        content: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("research").collect();
    if (existing.length === 0) {
      for (const art of args.articles) {
        await ctx.db.insert("research", art);
      }
    }
  },
});

export const add = mutation({
  args: {
    token: v.string(),
    category: v.string(),
    title: v.string(),
    desc: v.string(),
    date: v.string(),
    path: v.string(),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _token, ...article } = args;
    const id = await ctx.db.insert("research", article);
    return id;
  },
});

export const update = mutation({
  args: {
    token: v.string(),
    id: v.id("research"),
    category: v.string(),
    title: v.string(),
    desc: v.string(),
    date: v.string(),
    path: v.string(),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.patch(args.id, {
      category: args.category,
      title: args.title,
      desc: args.desc,
      date: args.date,
      path: args.path,
      content: args.content,
    });
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("research") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});
