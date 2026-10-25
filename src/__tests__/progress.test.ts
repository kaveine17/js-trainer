import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useProgressStore } from '../stores/progress'

describe('useProgressStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    })
  })

  it('подсчитывает количество правильных ответов', () => {
    const store = useProgressStore()

    store.results = [
      {
        topicSlug: 'event-loop',
        totalQuestions: 5,
        correctAnswers: 3,
        completedAt: '2026-01-01',
      },
      {
        topicSlug: 'promises',
        totalQuestions: 4,
        correctAnswers: 2,
        completedAt: '2026-01-02',
      },
    ]

    expect(store.totalCorrectAnswers).toBe(5)
  })

  it('подсчитывает количество пройденных тем', () => {
    const store = useProgressStore()

    store.results = [
      {
        topicSlug: 'event-loop',
        totalQuestions: 5,
        correctAnswers: 3,
        completedAt: '2026-01-01',
      },
      {
        topicSlug: 'promises',
        totalQuestions: 4,
        correctAnswers: 2,
        completedAt: '2026-01-02',
      },
    ]

    expect(store.completedTopics).toBe(2)
  })

  it('добавляет результат и сохраняет его в localStorage', () => {
    const store = useProgressStore()

    store.addResult({
      topicSlug: 'event-loop',
      totalQuestions: 5,
      correctAnswers: 4,
      completedAt: '2026-01-01',
    })

    expect(store.results).toHaveLength(1)
    expect(store.results[0].correctAnswers).toBe(4)
    expect(localStorage.setItem).toHaveBeenCalledOnce()
  })

  it('заменяет предыдущий результат той же темы', () => {
    const store = useProgressStore()

    store.addResult({
      topicSlug: 'event-loop',
      totalQuestions: 5,
      correctAnswers: 2,
      completedAt: '2026-01-01',
    })

    store.addResult({
      topicSlug: 'event-loop',
      totalQuestions: 5,
      correctAnswers: 4,
      completedAt: '2026-01-02',
    })

    expect(store.results).toHaveLength(1)
    expect(store.results[0].correctAnswers).toBe(4)
  })
})
