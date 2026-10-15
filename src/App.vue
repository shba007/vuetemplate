<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppUpdater } from './composables/useAppUpdater'
import { useDarkMode } from './composables/useDarkMode'
import { useAppNotification } from './composables/useAppNotification'
import { useGoogleAnalytics } from './composables/useGoogleAnalytics'
import { useCounterStore } from './stores/counter'

const { version } = useAppUpdater({ checkOnStartup: true, autoInstall: false })
const { isDark, toggleDark } = useDarkMode()
const { isSupported: isNotificationSupported, sendNotification } = useAppNotification()
const counter = useCounterStore()
const { trackEvent } = useGoogleAnalytics()

onMounted(async () => {
  console.log('App Version', version.value)
})

const handleNotify = () => {
  trackEvent('test_notification_click')
  sendNotification({
    title: 'VueTemplate',
    body: 'Web Notifications are active!',
  })
}
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors p-4"
  >
    <div
      class="p-8 max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl space-y-6 border border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <img :src="'/logo.png'" alt="VueTemplate Logo" class="w-10 h-10 rounded-lg" />
          <div>
            <h1 class="text-xl font-bold text-slate-900 dark:text-white">VueTemplate</h1>
            <p class="text-xs text-slate-500 dark:text-slate-400">Vue 3 + Tailwind v4 + Tauri v2</p>
          </div>
        </div>

        <button
          class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer text-sm font-medium"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          @click="toggleDark()"
        >
          {{ isDark ? '🌙 Dark' : '☀️ Light' }}
        </button>
      </div>

      <div
        class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-2 border border-slate-100 dark:border-slate-800"
      >
        <p class="text-sm font-semibold text-slate-700 dark:text-slate-300">Application Status</p>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Running version:
          <span class="font-mono font-medium text-slate-900 dark:text-slate-100"
            >v{{ version ?? '0.0.7' }}</span
          >
        </p>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <button
          class="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition shadow-sm cursor-pointer"
          @click="counter.increment"
        >
          Count: {{ counter.count }}
        </button>

        <button
          class="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-xl text-sm font-medium transition shadow-sm cursor-pointer"
          :disabled="!isNotificationSupported"
          @click="handleNotify"
        >
          🔔 Notify
        </button>
      </div>
    </div>
  </div>
</template>