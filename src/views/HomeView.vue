<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import TopicCard from '../components/TopicCard.vue'
import { topics } from '../data/topics'
import { questions } from '../data/questions'
import { useProgressStore } from '../stores/progress'

const router = useRouter()

const progressStore = useProgressStore()

progressStore.loadProgress()

const searchQuery = ref('')
const selectedCategory = ref<'Все темы' | 'JavaScript' | 'Асинхронность'>(
  'Все темы',
)

const totalTopics = computed(() => topics.length)
const totalQuestions = computed(() => questions.length)

const filteredTopics = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return topics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(query) ||
      topic.description.toLowerCase().includes(query)

    const matchesCategory =
      selectedCategory.value === 'Все темы' ||
      topic.category === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})

function openTopic(topic: { slug: string }) {
  router.push(`/topics/${topic.slug}`)
}
</script>

<template>
  <AppHeader />

  <main class="mx-auto max-w-5xl px-6 py-12 sm:py-16">
    <section class="mb-12">
      <p class="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-400">
        Learn by doing
      </p>

      <h1 class="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
        Проверь, как хорошо ты знаешь JavaScript
      </h1>

      <p class="max-w-2xl text-lg leading-8 text-slate-400">
        Предсказывай результат выполнения кода, проверяй свои знания
        и разбирайся в сложных темах шаг за шагом.
      </p>
    </section>

    <section class="mb-12">
      <div class="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
        <p>Всего тем: {{ totalTopics }}</p>
        <p>Всего вопросов: {{ totalQuestions }}</p>
      </div>

      <h2 class="mb-6 text-2xl font-semibold">Выбери тему</h2>

      <div class="mb-6 grid gap-3 sm:grid-cols-2">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Поиск по названию или описанию..."
          class="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-emerald-400"
        />

        <select
          v-model="selectedCategory"
          class="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-400"
        >
          <option value="Все темы">Все темы</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Асинхронность">Асинхронность</option>
        </select>
      </div>

      <div v-if="filteredTopics.length" class="grid gap-4 md:grid-cols-3">
        <TopicCard
          v-for="topic in filteredTopics"
          :key="topic.slug"
          :topic="topic"
          @start="openTopic"
        />
      </div>

      <p v-else class="rounded-xl border border-slate-800 p-6 text-center text-slate-400">
        По вашему запросу ничего не найдено.
      </p>
    </section>

    <section>
      <h2 class="mb-6 text-2xl font-semibold">Мой прогресс</h2>

      <p v-if="progressStore.results.length === 0" class="text-slate-400">
        Пока нет завершённых тренировок. Выбери тему и проверь свои знания!
      </p>

      <div v-else class="grid gap-3 sm:grid-cols-2">
        <article
          v-for="result in progressStore.results"
          :key="result.topicTitle"
          class="rounded-xl border border-slate-800 bg-slate-900 p-5"
        >
          <h3 class="mb-2 font-semibold">{{ result.topicTitle }}</h3>

          <p class="text-sm text-slate-400">
            Правильных ответов:
            {{ result.correctAnswers }} из {{ result.totalQuestions }}
          </p>

          <p class="mt-2 text-sm text-emerald-400">
            {{ result.totalQuestions
              ? Math.round(result.correctAnswers / result.totalQuestions * 100)
              : 0 }}% правильных ответов
          </p>
        </article>
      </div>
    </section>
  </main>
</template>