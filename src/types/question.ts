export type Question = {
  id: number
  topicSlug: string
  prompt: string
  code?: string
  options: string[]
  correctAnswer: number
  explanation: string
}
