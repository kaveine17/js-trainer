export type Question = {
  id: number
  topicTitle: string
  prompt: string
  code?: string
  options: string[]
  correctAnswer: number
  explanation: string
}