
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
</script>

<template>
  <AppHeader />

  <main class="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
    <p class="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-400">
      Error 404
    </p>

    <h1 class="mb-4 text-5xl font-bold">Страница не найдена</h1>

    <p class="mb-8 max-w-md text-slate-400">
      Похоже, такой страницы не существует. Вернись на главную и выбери тему.
    </p>

    <RouterLink
      to="/"
      class="rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
    >
      На главную
    </RouterLink>
  </main>
</template>
