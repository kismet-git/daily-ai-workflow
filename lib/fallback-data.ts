import type { WorkflowData } from "./types"

export const fallbackWorkflows: WorkflowData[] = [
  {
    id: "1",
    name: "AI-Powered Content Generation Pipeline",
    description: "Automate your content creation with AI-powered tools for writing, editing, and optimization.",
    category: "Content Creation",
    difficulty: "intermediate",
    estimatedTime: "2 hours",
    tools: ["ChatGPT", "Jasper AI", "Grammarly", "Hemingway Editor"],
    steps: [
      "Define your content goals and target audience",
      "Generate initial drafts using AI writing tools",
      "Edit and refine content for clarity and tone",
      "Optimize for SEO and readability",
      "Publish and distribute across channels",
    ],
    tags: ["AI", "Content", "Automation", "Writing"],
    imageUrl: "/ai-content-generation.png",
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Smart Email Management System",
    description: "Use AI to automatically categorize, prioritize, and respond to emails efficiently.",
    category: "Productivity",
    difficulty: "beginner",
    estimatedTime: "1 hour",
    tools: ["Gmail", "Zapier", "Claude AI", "Notion"],
    steps: [
      "Set up email filters and labels",
      "Connect AI assistant for priority detection",
      "Create response templates",
      "Automate routine replies",
      "Track and analyze email metrics",
    ],
    tags: ["Email", "Automation", "AI", "Productivity"],
    imageUrl: "/email-management-concept.png",
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "AI Research Assistant Workflow",
    description: "Streamline research with AI-powered summarization, citation management, and insights extraction.",
    category: "Research",
    difficulty: "advanced",
    estimatedTime: "3 hours",
    tools: ["Perplexity AI", "Zotero", "Notion AI", "ChatGPT"],
    steps: [
      "Define research questions and scope",
      "Use AI to gather and summarize sources",
      "Organize findings in knowledge base",
      "Extract key insights and patterns",
      "Generate research reports",
    ],
    tags: ["Research", "AI", "Knowledge Management"],
    imageUrl: "/research-assistant.png",
    featured: false,
    createdAt: new Date().toISOString(),
  },
]

export function getFeaturedWorkflow(): WorkflowData | null {
  return fallbackWorkflows.find((w) => w.featured) || fallbackWorkflows[0] || null
}

export function getAllWorkflows(): WorkflowData[] {
  return fallbackWorkflows
}
