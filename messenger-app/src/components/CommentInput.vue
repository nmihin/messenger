<template>
  <div class="relative w-full px-4">
    <input
      v-model="input"
      @input="onInput"
      placeholder="...type something"
   class="w-full border border-neutral-100 rounded-[5px] px-4 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-xs placeholder:font-bold text-sm text-neutral-500"
    />
    <button 
      @click="submit" 
      class="absolute right-3 top-1/2 -translate-y-1/2 bg-neutral-100 text-neutral-dark px-4 py-1 rounded-[5px] hover:bg-opacity-80 transition flex items-center justify-center border border-neutral-light mr-6 text-xs font-bold py-2 px-4 rounded min-w-[80px]"
      :disabled="!input.trim()"
      :class="{ 'opacity-50 cursor-not-allowed': !input.trim() }"
    >
      Send
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'submit', value: string): void
  (e: 'typing', value: boolean): void
}>()

const input = ref('')

function submit() {
  if (input.value.trim()) {
    emit('submit', input.value.trim())
    emit('typing', false)
    input.value = ''
  }
}

function onInput() {
  emit('typing', input.value.length > 0)
}
</script>