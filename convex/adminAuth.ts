import { ConvexError, v } from "convex/values";
import type { MutationCtx, QueryCtx } from "./_generated/server";

const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

export const tokenValidator = v.string();

// Every mutation that reads/writes admin-only data must call this first.
// Throws if the caller did not present a valid, unexpired session token
// issued by settings.login, so protected mutations can no longer be
// invoked directly (e.g. from the Convex dashboard or a raw API call)
// without first passing the server-side passcode check.
export async function requireAdmin(
  ctx: MutationCtx | QueryCtx,
  token: string
): Promise<void> {
  const session = await ctx.db
    .query("admin_sessions")
    .withIndex("by_token", (q) => q.eq("token", token))
    .unique();

  if (!session || session.expiresAt < Date.now()) {
    throw new ConvexError("Not authenticated");
  }
}

export function newSessionExpiry(): number {
  return Date.now() + SESSION_TTL_MS;
}
