
import { onMounted, watch } from 'vue'
import type { Ref } from 'vue'
import type { SavedProgress, TopicProgress } from '../types/progress'

const STORAGE_KEY = 'js-trainer-progress'

export function useProgress(results: Ref<TopicProgress[]>) {
  onMounted(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)

      if (!saved) return

      const parsed: SavedProgress = JSON.parse(saved)

      if (Array.isArray(parsed.results)) {
        results.value = parsed.results
      }
    } catch {
      console.warn('Не удалось восстановить прогресс')
    }
  })

  watch(
    results,
    (newResults) => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ results: newResults }),
      )
    },
    { deep: true },
  )
}
