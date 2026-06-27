import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  waitlist: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.string(),
    useCase: v.string(),
    submittedAt: v.string(),
    status: v.string(), // 'Pending' | 'Approved' | 'Rejected'
    apiKey: v.union(v.string(), v.null()),
  }),
  contact_messages: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    submittedAt: v.string(),
    status: v.string(), // 'Unread' | 'Read' | 'Replied'
  }),
  roadmap: defineTable({
    phase: v.string(),
    status: v.string(),
    statusColor: v.string(),
    badgeBg: v.string(),
    desc: v.string(),
    icon: v.string(),
    orderIndex: v.number(),
  }),
  research: defineTable({
    category: v.string(),
    title: v.string(),
    desc: v.string(),
    date: v.string(),
    path: v.string(),
    content: v.optional(v.string()),
  }),
  founder_profile: defineTable({
    name: v.string(),
    role: v.string(),
    storyPara1: v.string(),
    storyPara2: v.string(),
    mission: v.string(),
  }),
  settings: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),
  pipelines: defineTable({
    name: v.string(),
    description: v.string(),
    provider: v.string(), // 'Pinecone' | 'ChromaDB' | 'Qdrant' | 'pgvector'
    model: v.string(),    // e.g., 'Llama-3-8B', 'Mistral-7B', 'GPT-4o'
    chunkSize: v.number(),
    chunkOverlap: v.number(),
    systemPrompt: v.string(),
    createdAt: v.string(),
    appType: v.optional(v.string()),    // 'rag', 'website', 'training'
    scaleLimit: v.optional(v.string()), // e.g., '50,000 Users'
    cloudTarget: v.optional(v.string()) // e.g., 'AWS Fargate'
  }),
});
