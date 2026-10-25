<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="flex items-center justify-between border-b border-slate-800 px-6 py-5">
    <RouterLink to="/" class="text-xl font-bold tracking-tight">
      JS<span class="text-emerald-400">Trainer</span>
    </RouterLink>

    <span class="text-sm text-slate-400"> JavaScript practice </span>
  </header>
</template>
