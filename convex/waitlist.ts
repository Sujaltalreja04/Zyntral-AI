import { query, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { requireAdmin } from "./adminAuth";

const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_SUBMISSIONS_PER_WINDOW = 3;

async function checkRateLimit(ctx: any): Promise<void> {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  const recent = await ctx.db
    .query("waitlist")
    .filter((q: any) => q.gte(q.field("_creationTime"), windowStart))
    .collect();

  if (recent.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    throw new ConvexError("Too many submissions. Please try again later.");
  }
}

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
    await checkRateLimit(ctx);
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
    token: v.string(),
    id: v.id("waitlist"),
    status: v.string(),
    apiKey: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.patch(args.id, {
      status: args.status,
      apiKey: args.apiKey,
    });
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("waitlist") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});

export const purge = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const all = await ctx.db.query("waitlist").collect();
    for (const item of all) {
      await ctx.db.delete(item._id);
    }
  },
});
