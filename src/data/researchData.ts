export interface ResearchArticle {
  category: string;
  title: string;
  desc: string;
  path: string;
  date: string;
}

export const RESEARCH_ARTICLES: ResearchArticle[] = [
  {
    category: 'AI Agents',
    title: 'Decentralized Multi-Agent Coordination in Latency-Constrained Physical Environments',
    desc: 'An exploration of peer-to-peer agent coordination and consensus-directed graphs in distributed logistics networks.',
    path: '/research/ai-agents',
    date: 'June 2026'
  },
  {
    category: 'RAG Architectures',
    title: 'On-Prompt Retrieval Compilation: Dynamically Adapting Chunking and Index Routing',
    desc: 'Analyzing retrieval precision improvements and latency reductions compiled dynamically on-prompt.',
    path: '/research/rag-architectures',
    date: 'May 2026'
  },
  {
    category: 'LLM Infrastructure',
    title: 'Automating Model Alignment: Prompt-Directed Direct Preference Optimization (DPO) Loops',
    desc: 'Synthetic preference pair orchestration strategies designed for LoRA weight fine-tunes on decentralized nodes.',
    path: '/research/llm-infrastructure',
    date: 'March 2026'
  },
  {
    category: 'Open Source Analysis',
    title: 'Comparative Study: Proprietary vs. Open-Weights Architectures in Industrial Automation',
    desc: 'Evaluating cost, security, and latency tradeoffs between leading commercial LLM APIs and fine-tuned open-source models.',
    path: '/research/open-source-analysis',
    date: 'February 2026'
  },
  {
    category: 'Zyntral Build Logs',
    title: 'Active Changelog & Development Milestones Stream',
    desc: 'Following the step-by-step progress and operational releases of the Zyntral compiler and runtime nodes.',
    path: '/research/build-logs',
    date: 'Updated Live'
  }
];
