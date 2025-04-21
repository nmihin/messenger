<template>
  <div class="flex gap-2">
    <input
      v-model="input"
      @input="onInput"
      placeholder="Write a message..."
      class="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    />
    <button 
      @click="submit" 
      class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition flex items-center justify-center"
      :disabled="!input.trim()"
      :class="{ 'opacity-50 cursor-not-allowed': !input.trim() }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>
  
  <script lang="ts" setup>
  import { ref, watch } from 'vue'
  
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