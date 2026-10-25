export type TopicProgress = {
  topicSlug?: string
  topicTitle?: string
  totalQuestions: number
  correctAnswers: number
  completedAt: string
}

export type SavedProgress = {
  results: TopicProgress[]
}
