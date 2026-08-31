<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppUpdater } from './composables/useAppUpdater'

const { version } = useAppUpdater({ checkOnStartup: true, autoInstall: true })

onMounted(async () => {
  console.log('App Version', version.value)
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-slate-100">
    <div class="p-6 max-w-sm bg-white rounded-xl shadow-lg space-y-4">
      <h1 class="text-2xl font-bold text-slate-900">Vue + Tailwind + Tauri</h1>
      <p class="text-slate-500">It's up and running! v{{ version }}</p>
    </div>
  </div>
</template>