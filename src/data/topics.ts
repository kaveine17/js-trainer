import type { Topic } from '../types/topic'

export const topics: Topic[] = [
  {
    slug: 'event-loop',
    title: 'Event Loop',
    description: 'Порядок выполнения кода, микрозадачи и таймеры',
    category: 'Асинхронность',
  },
  {
    slug: 'promises',
    title: 'Promises',
    description: 'Promise, then, catch и async/await',
    category: 'Асинхронность',
  },
  {
    slug: 'javascript-basics',
    title: 'JavaScript Basics',
    description: 'Типы данных, преобразования и область видимости',
    category: 'JavaScript',
  },
]

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug)
}

export function getTopicTitleBySlug(slug: string): string | undefined {
  return getTopicBySlug(slug)?.title
}
