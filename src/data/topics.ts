import type { Topic } from '../types/topic'

export const topics: Topic[] = [
  {
    slug: 'event-loop',
    title: 'Event Loop',
    description: 'Порядок выполнения кода, микрозадачи и таймеры',
    questions: 12,
    category: 'Асинхронность',
  },
  {
    slug: 'promises',
    title: 'Promises',
    description: 'Promise, then, catch и async/await',
    questions: 10,
    category: 'Асинхронность',
  },
  {
    slug: 'javascript-basics',
    title: 'JavaScript Basics',
    description: 'Типы данных, преобразования и область видимости',
    questions: 15,
    category: 'JavaScript',
  },
]