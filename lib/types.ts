// Workflow data types for the app
export interface WorkflowData {
  id: string
  name: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedTime: string
  tools: string[]
  steps: string[]
  tags: string[]
  imageUrl?: string
  featured?: boolean
  createdAt: string
  updatedAt?: string
}
