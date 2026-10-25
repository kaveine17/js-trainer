<script setup lang="ts">
import { computed } from 'vue'
import type { Topic } from '../types/topic'
import { getQuestionCountByTopic } from '../data/questions'

const props = defineProps<{
  topic: Topic
}>()

const emit = defineEmits<{
  start: [topic: Topic]
}>()

const questionCount = computed(() => getQuestionCountByTopic(props.topic.slug))
</script>

<template>
  <article
    class="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-400"
  >
    <h3 class="mb-3 text-lg font-semibold">
      {{ topic.title }}
    </h3>

    <p class="mb-6 text-sm leading-6 text-slate-400">
      {{ topic.description }}
    </p>

    <div class="flex items-center justify-between text-sm text-slate-500">
      <span>{{ questionCount }} вопросов</span>

      <button class="text-emerald-400 hover:text-emerald-300" @click="emit('start', topic)">
        Начать →
      </button>
    </div>
  </article>
</template>
