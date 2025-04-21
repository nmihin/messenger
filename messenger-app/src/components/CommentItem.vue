<template>
  <div class="mb-4">
    <!-- Main Comment -->
    <div class="flex gap-3">
      <!-- Avatar with connector lines -->
      <div class="relative">
        <div 
          class="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold relative z-10"
        >
          <span>{{ comment.author.name.charAt(0) }}</span>
        </div>
      </div>
      
      <div class="flex-1">
        <div class="bg-white p-3 rounded-lg shadow-sm max-w-[500px]">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-gray-800">{{ comment.author.name }}</span>
          </div>
          <div class="flex items-center justify-between mt-1">
            <p class="text-sm text-neutral-500" v-html="formatCommentText(comment.text)"></p>
          </div>
        </div>
        <div class="flex items-center gap-2 ml-2 mt-2">
          <span class="text-xs text-gray-500">{{ formattedTime }}</span>
          <button 
            @click="replying = !replying" 
            class="text-xs text-primary-500 hover:text-blue-700"
          >
            {{ replying ? 'Cancel' : `Reply${comment.children?.length ? ` (${comment.children.length})` : ''}` }}
          </button>
        </div>
        <!-- Reply Form -->
        <div v-if="replying" class="mt-2 pl-10 ">
          <CommentInput 
            @submit="submitReply" 
            @typing="onTyping"
            class="rounded-lg"
          />
        </div>
      </div>
    </div>
    
    <!-- Nested Replies with L-shaped connector -->
    <div 
      v-if="comment.children?.length" 
      class="mt-2 ml-5 pl-10 relative"
    >
      <!-- Horizontal connector line -->
      <div 
        class="absolute top-5 left-0 w-5 h-px bg-neutral-500 vertical-line"
      ></div>
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

function formatCommentText(text?: string) {
  if (!text) return '';  // Return empty string if text is undefined/null
  
  // Convert URLs to clickable links
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.replace(urlRegex, url => {
    return `<a href="${url}" class="text-primary-500 hover:underline" target="_blank" rel="noopener noreferrer">${url}</a>`
  })
}

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

<style>
.vertical-line:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1px;
  height: 100%;
  background-color: #82878D;
  min-height: 49px;
}

/* Style for links in comments */
.text-blue-500 {
  color: #3b82f6;
}
.text-blue-500:hover {
  text-decoration: underline;
}
</style>