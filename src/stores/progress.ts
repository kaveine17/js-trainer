
import { defineStore } from 'pinia'
import type { TopicProgress } from '../types/progress'

const STORAGE_KEY = 'js-trainer-progress'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    results: [] as TopicProgress[],
    initialized: false,
  }),

  getters: {
    completedTopics: (state) => state.results.length,

    totalCorrectAnswers: (state) =>
      state.results.reduce(
        (total, result) => total + result.correctAnswers,
        0,
      ),
  },

  actions: {
    loadProgress() {
      if (this.initialized) return

      this.initialized = true

      try {
        const saved = localStorage.getItem(STORAGE_KEY)

        if (!saved) return

        const parsed: unknown = JSON.parse(saved)

        if (
          typeof parsed === 'object' &&
          parsed !== null &&
          'results' in parsed &&
          Array.isArray(parsed.results)
        ) {
          this.results = parsed.results as TopicProgress[]
        }
      } catch {
        console.warn('Не удалось восстановить прогресс')
      }
    },

    saveProgress() {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ results: this.results }),
        )
      } catch {
        console.warn('Не удалось сохранить прогресс')
      }
    },

    addResult(result: TopicProgress) {
      this.results = [
        ...this.results.filter(
          (item) => item.topicTitle !== result.topicTitle,
        ),
        result,
      ]

      this.saveProgress()
    },
  },
})
