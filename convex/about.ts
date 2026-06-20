import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getFounder = query({
  args: {},
  handler: async (ctx) => {
    const list = await ctx.db.query("founder_profile").collect();
    if (list.length > 0) {
      return list[0];
    }
    return null; // Return null so client can seed or use default
  },
});

export const updateFounder = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    storyPara1: v.string(),
    storyPara2: v.string(),
    mission: v.string(),
  },
  handler: async (ctx, args) => {
    const list = await ctx.db.query("founder_profile").collect();
    if (list.length > 0) {
      await ctx.db.patch(list[0]._id, args);
      return list[0]._id;
    } else {
      const id = await ctx.db.insert("founder_profile", args);
      return id;
    }
  },
});
