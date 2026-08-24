import { query, mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { requireAdmin } from "./adminAuth";

const RATE_LIMIT_WINDOW_MS = 60000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;

async function checkRateLimit(ctx: any): Promise<void> {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  const recent = await ctx.db
    .query("contact_messages")
    .filter((q: any) => q.gte(q.field("_creationTime"), windowStart))
    .collect();

  if (recent.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    throw new ConvexError("Too many submissions. Please try again later.");
  }
}

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
    await checkRateLimit(ctx);
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
    token: v.string(),
    id: v.id("contact_messages"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.patch(args.id, {
      status: args.status,
    });
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("contact_messages") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});
