<template>
    <div class="mt-4">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @add-reply="$emit('add-comment', $event)"
      />
    </div>
  </template>
  
  <script lang="ts" setup>
  import CommentItem from './CommentItem.vue'
  import type { Comment } from '../utils/commentTree'
  
  defineProps<{ comments: Comment[] }>()
  
  defineEmits<{ (e: 'add-comment', payload: { text: string; parentId: string | null }): void }>()
  </script>