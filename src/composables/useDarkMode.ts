import { useDark, useToggle } from '@vueuse/core'

/**
 * Manages dark mode state and synchronization with Tailwind CSS v4.
 * Toggles the 'dark' class on <html> and persists user preference to localStorage.
 */
export function useDarkMode() {
  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: '',
  })
  const toggleDark = useToggle(isDark)

  return {
    isDark,
    toggleDark,
  }
}