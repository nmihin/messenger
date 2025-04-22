<template>
  <div class="mb-8">
    <div class="flex gap-3">
      <div class="relative">
        <div 
          class="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold relative z-10"
          :style="{ backgroundColor: getAvatarColor(comment.author.name) }"
        >
          <span>{{ comment.author.name.charAt(0) }}</span>
        </div>
      </div>
      
      <div class="flex-1">
        <div class="bg-white p-3 rounded-lg shadow-sm max-w-[500px]">
          <div class="flex items-center gap-2">
            <span class="font-medium text-gray-800 text-sm">{{ comment.author.name }}</span>
          </div>
          <div class="flex items-center justify-between mt-1">
            <p class="text-sm text-neutral-500" v-html="formatCommentText(comment.text)"></p>
          </div>
        </div>
        <div class="flex items-center gap-2 ml-2 mt-2">
          <span class="text-xs text-gray-500">{{ formattedTime }}</span>
          <button 
            @click="replying = !replying" 
            class="text-xs text-primary-700 hover:text-blue-700 font-medium"
          >
            {{ replying ? 'Cancel' : `Reply${comment.children?.length ? ` (${comment.children.length})` : ''}` }}
          </button>
        </div>
        <!-- Reply Form -->
        <div v-if="replying" class="mt-2 pl-10 ">
          <CommentInput 
            @submit="(payload) => submitReply(payload.text)" 
            @typing="onTyping"
            class="rounded-lg"
          />
        </div>
      </div>
    </div>
    
    <div 
      v-if="comment.children?.length" 
      class="mt-2 ml-5 pl-10 relative"
    >
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

const avatarColors = ['#B62323', '#23B632', '#B3B623']

function getAvatarColor(name: string): string {
  if (!name) return avatarColors[0]
  
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % avatarColors.length
  return avatarColors[index]
}

function formatCommentText(text: unknown) {
  if (typeof text !== 'string') return ''
  
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.replace(urlRegex, url => {
    return `<a href="${url}" class="text-primary-700 hover:underline" target="_blank" rel="noopener noreferrer">${url}</a>`
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

.text-blue-500 {
  color: #3b82f6;
}
.text-blue-500:hover {
  text-decoration: underline;
}
</style>