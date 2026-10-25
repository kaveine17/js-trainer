import { defineStore } from 'pinia'
import { topics } from '../data/topics'
import type { TopicProgress } from '../types/progress'

const STORAGE_KEY = 'js-trainer-progress'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isNonNegativeInteger(value: unknown): value is number {
  return (
    typeof value === 'number' && Number.isInteger(value) && Number.isFinite(value) && value >= 0
  )
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== ''
}

function resolveTopicSlug(record: Record<string, unknown>): string | undefined {
  if (isNonEmptyString(record.topicSlug)) {
    return record.topicSlug.trim()
  }

  if (!isNonEmptyString(record.topicTitle)) {
    return undefined
  }

  const matches = topics.filter((topic) => topic.title === record.topicTitle)

  if (matches.length === 1) {
    return matches[0].slug
  }

  return undefined
}

function parseProgressRecord(value: unknown): TopicProgress | null {
  if (!isRecord(value)) {
    return null
  }

  if (!isNonNegativeInteger(value.totalQuestions) || !isNonNegativeInteger(value.correctAnswers)) {
    return null
  }

  if (value.correctAnswers > value.totalQuestions) {
    return null
  }

  if (!isNonEmptyString(value.completedAt)) {
    return null
  }

  const topicSlug = resolveTopicSlug(value)
  const result: TopicProgress = {
    totalQuestions: value.totalQuestions,
    correctAnswers: value.correctAnswers,
    completedAt: value.completedAt,
  }

  if (topicSlug) {
    result.topicSlug = topicSlug
  } else if (isNonEmptyString(value.topicTitle)) {
    result.topicTitle = value.topicTitle
  }

  return result
}

function serializeResult(result: TopicProgress): TopicProgress {
  const serialized: TopicProgress = {
    totalQuestions: result.totalQuestions,
    correctAnswers: result.correctAnswers,
    completedAt: result.completedAt,
  }

  if (result.topicSlug) {
    serialized.topicSlug = result.topicSlug
  } else if (result.topicTitle) {
    serialized.topicTitle = result.topicTitle
  }

  return serialized
}

function shouldPersistParsedResults(
  rawResults: unknown[],
  parsedResults: TopicProgress[],
): boolean {
  if (parsedResults.length === 0) {
    return false
  }

  if (parsedResults.length !== rawResults.length) {
    return true
  }

  return parsedResults.some((result, index) => {
    const raw = rawResults[index]

    if (!isRecord(raw)) {
      return true
    }

    return Boolean(result.topicSlug) && raw.topicSlug !== result.topicSlug
  })
}

export const useProgressStore = defineStore('progress', {
  state: () => ({
    results: [] as TopicProgress[],
    initialized: false,
  }),

  getters: {
    completedTopics: (state) => state.results.filter((result) => Boolean(result.topicSlug)).length,

    totalCorrectAnswers: (state) =>
      state.results.reduce((total, result) => total + result.correctAnswers, 0),
  },

  actions: {
    loadProgress() {
      if (this.initialized) {
        return
      }

      this.initialized = true

      try {
        const saved = localStorage.getItem(STORAGE_KEY)

        if (!saved) {
          return
        }

        const parsed: unknown = JSON.parse(saved)

        if (!isRecord(parsed) || !Array.isArray(parsed.results)) {
          console.warn('Не удалось восстановить прогресс: некорректная структура данных')
          return
        }

        const parsedResults = parsed.results
          .map(parseProgressRecord)
          .filter((result): result is TopicProgress => result !== null)

        this.results = parsedResults

        if (shouldPersistParsedResults(parsed.results, parsedResults)) {
          this.saveProgress()
        }
      } catch {
        console.warn('Не удалось восстановить прогресс')
      }
    },

    saveProgress() {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            results: this.results.map(serializeResult),
          }),
        )
      } catch {
        console.warn('Не удалось сохранить прогресс')
      }
    },

    addResult(result: TopicProgress) {
      this.results = [
        ...this.results.filter((item) => {
          if (result.topicSlug && item.topicSlug) {
            return item.topicSlug !== result.topicSlug
          }

          return true
        }),
        serializeResult(result),
      ]

      this.saveProgress()
    },
  },
})
