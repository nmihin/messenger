<template>
  <div class="mb-4">
    <!-- Main Comment -->
    <div class="flex gap-3">
      <div 
        class="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold">
        <span>{{ comment.author.name.charAt(0) }}</span>
      </div>
      <div class="flex-1">
        <div class="bg-white p-3 rounded-lg shadow-sm">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-gray-800">{{ comment.author.name }}</span>
          </div>
          <div class="flex items-center justify-between mt-1">
            <p class="text-gray-700">{{ comment.text }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2 ml-2 mt-2">
              <span class="text-xs text-gray-500">{{ formattedTime }}</span>
              <button 
                @click="replying = !replying" 
                class="text-xs text-blue-500 hover:text-blue-700"
              >
                {{ replying ? 'Cancel' : `Reply${comment.children?.length ? ` (${comment.children.length})` : ''}` }}
              </button>
        </div>
        <!-- Reply Form -->
        <div v-if="replying" class="mt-2 pl-10">
          <CommentInput 
            @submit="submitReply" 
            @typing="onTyping"
            class="rounded-lg"
          />
        </div>
      </div>
    </div>
    
    <!-- Nested Replies -->
    <div v-if="comment.children?.length" class="mt-2 pl-10 border-l-2 border-gray-200">
      <CommentList 
        :comments="comment.children" 
        @add-comment="$emit('add-reply', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import CommentList from './CommentList.vue'
import CommentInput from './CommentInput.vue'
import type { Comment } from '../utils/commentTree'

const props = defineProps<{ comment: Comment }>()

const emit = defineEmits<{ (e: 'add-reply', payload: { text: string; parentId: string }): void }>()

const replying = ref(false)
const isTyping = ref(false)

function submitReply(text: string) {
  emit('add-reply', { text, parentId: props.comment.id })
  isTyping.value = false
  replying.value = false
}

function onTyping(val: boolean) {
  isTyping.value = val
}

const formattedTime = computed(() => {
  return new Date(props.comment.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
})
</script>