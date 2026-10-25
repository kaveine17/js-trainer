<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Topic } from '../types/topic'
import type { Question } from '../types/question'
import type { TopicProgress } from '../types/progress'

const props = defineProps<{
  topic: Topic
  questions: Question[]
}>()

const emit = defineEmits<{
  exit: []
  complete: [result: TopicProgress]
}>()

const currentIndex = ref(0)
const selectedAnswer = ref<number | null>(null)
const correctAnswers = ref(0)

const currentQuestion = computed(() => {
  return props.questions[currentIndex.value]
})

const isFinished = computed(() => {
  return currentIndex.value >= props.questions.length
})

function selectAnswer(index: number) {
  if (selectedAnswer.value !== null) {
    return
  }

  selectedAnswer.value = index

  if (index === currentQuestion.value.correctAnswer) {
    correctAnswers.value++
  }
}

function nextQuestion() {
  if (currentIndex.value === props.questions.length - 1) {
    emit('complete', {
      topicSlug: props.topic.slug,
      totalQuestions: props.questions.length,
      correctAnswers: correctAnswers.value,
      completedAt: new Date().toISOString(),
    })
  }

  currentIndex.value++
  selectedAnswer.value = null
}

function restart() {
  currentIndex.value = 0
  selectedAnswer.value = null
  correctAnswers.value = 0
}
</script>

<template>
  <section class="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
    <div class="mb-6 flex items-center justify-between gap-4">
      <div>
        <p class="mb-1 text-sm text-emerald-400">
          {{ topic.title }}
        </p>

        <h2 class="text-xl font-semibold">Тренировка вопросов</h2>
      </div>

      <button class="text-sm text-slate-400 transition hover:text-white" @click="emit('exit')">
        Выйти
      </button>
    </div>

    <div v-if="questions.length === 0" class="py-8 text-center text-slate-400">
      Для этой темы пока нет вопросов.
    </div>

    <div v-else-if="isFinished" class="py-6 text-center">
      <p class="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-400">
        Тренировка завершена
      </p>

      <h3 class="mb-3 text-3xl font-bold">{{ correctAnswers }} из {{ questions.length }}</h3>

      <p class="mb-8 text-slate-400">
        Правильных ответов: {{ correctAnswers }} из {{ questions.length }}.
      </p>

      <div class="flex flex-wrap justify-center gap-3">
        <button
          class="rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
          @click="restart"
        >
          Пройти заново
        </button>

        <button
          class="rounded-xl border border-slate-700 px-5 py-3 transition hover:border-slate-500"
          @click="emit('exit')"
        >
          К темам
        </button>
      </div>
    </div>

    <div v-else-if="currentQuestion">
      <div class="mb-6">
        <div class="mb-3 flex justify-between text-sm text-slate-400">
          <span>Вопрос {{ currentIndex + 1 }} из {{ questions.length }}</span>
          <span>Правильных: {{ correctAnswers }}</span>
        </div>

        <div class="h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            class="h-full rounded-full bg-emerald-400 transition-all"
            :style="{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }"
          />
        </div>
      </div>

      <h3 class="mb-5 text-xl font-semibold leading-8">
        {{ currentQuestion.prompt }}
      </h3>

      <pre
        v-if="currentQuestion.code"
        class="mb-6 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm leading-7 text-emerald-300"
      ><code>{{ currentQuestion.code }}</code></pre>

      <div class="space-y-3">
        <button
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          class="w-full rounded-xl border p-4 text-left transition"
          :class="{
            'border-slate-700 hover:border-slate-500': selectedAnswer === null,
            'border-emerald-400 bg-emerald-400/10':
              selectedAnswer !== null && index === currentQuestion.correctAnswer,
            'border-red-400 bg-red-400/10':
              selectedAnswer === index && selectedAnswer !== currentQuestion.correctAnswer,
            'cursor-default': selectedAnswer !== null,
          }"
          :disabled="selectedAnswer !== null"
          @click="selectAnswer(index)"
        >
          <span class="mr-3 text-slate-500"> {{ String.fromCharCode(65 + index) }}. </span>

          {{ option }}
        </button>
      </div>

      <div
        v-if="selectedAnswer !== null"
        class="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-5"
      >
        <p
          class="mb-2 font-semibold"
          :class="
            selectedAnswer === currentQuestion.correctAnswer ? 'text-emerald-400' : 'text-red-400'
          "
        >
          {{ selectedAnswer === currentQuestion.correctAnswer ? 'Правильно!' : 'Не совсем!' }}
        </p>

        <p class="text-sm leading-7 text-slate-400">
          {{ currentQuestion.explanation }}
        </p>

        <button
          class="mt-5 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
          @click="nextQuestion"
        >
          {{ currentIndex === questions.length - 1 ? 'Посмотреть результат' : 'Следующий вопрос' }}
        </button>
      </div>
    </div>
  </section>
</template>
