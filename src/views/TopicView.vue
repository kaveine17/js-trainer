
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import QuestionTrainer from '../components/QuestionTrainer.vue'
import { topics } from '../data/topics'
import { questions } from '../data/questions'
import type { TopicProgress } from '../types/progress'
import { useProgressStore } from '../stores/progress'
const route = useRoute()
const router = useRouter()

const progressStore = useProgressStore()

progressStore.loadProgress()

const slug = computed(() => String(route.params.slug ?? ''))

const selectedTopic = computed(() => {
  return topics.find((topic) => topic.slug === slug.value)
})

const currentQuestions = computed(() => {
  if (!selectedTopic.value) {
    return []
  }

  return questions.filter((question) => {
    return question.topicTitle === selectedTopic.value?.title
  })
})

function handleComplete(result: TopicProgress) {
  progressStore.addResult(result)
}

function goHome() {
  router.push('/')
}
</script>

<template>
  <AppHeader />

  <main class="mx-auto max-w-5xl px-6 py-12 sm:py-16">
    <div v-if="selectedTopic">
      <QuestionTrainer
        :key="selectedTopic.slug"
        :topic="selectedTopic"
        :questions="currentQuestions"
        @exit="goHome"
        @complete="handleComplete"
      />
    </div>

    <section
      v-else
      class="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center"
    >
      <h1 class="mb-3 text-2xl font-bold">Тема не найдена</h1>

      <p class="mb-6 text-slate-400">
        Возможно, адрес неправильный или такой темы больше нет.
      </p>

      <button
        class="rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
        @click="goHome"
      >
        Вернуться на главную
      </button>
    </section>
  </main>
</template>
