<template>
  <div class="min-h-screen bg-blue-500 p-4">
    <div class="max-w-2xl pt-4 mx-auto bg-gray-100 rounded-xl shadow-lg overflow-hidden relative">
      <!-- Header with dynamic date -->
      <div class="text-gray text-center text-sm py-4">
        {{ formattedDate }}
      </div>
      
      <!-- Messages List -->
      <div class="p-4 space-y-4 max-h-[70vh] overflow-y-auto pb-20">
        <CommentList 
          :comments="commentsTree" 
          @add-comment="handleAddComment" 
        />
      </div>
      
      <!-- Input Area -->
      <div class="p-4 p-4 absolute w-full bottom-0">
        <CommentInput @submit="handleAddComment" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import moment from 'moment'
import rawData from './data/example.json'
import CommentList from './components/CommentList.vue'
import CommentInput from './components/CommentInput.vue'
import { buildCommentTree, Comment } from './utils/commentTree'

const flatComments = ref<Comment[]>(rawData.data.comments)
const commentsTree = ref<Comment[]>(buildCommentTree(flatComments.value))

// Format current date using Moment.js
const formattedDate = computed(() => {
  return moment().format('dddd, DD.MM.YYYY') // Tuesday, 13.12.2020
})

function handleAddComment({ text, parentId = null }: { text: string; parentId?: string | null }) {
  const newComment: Comment = {
    id: Date.now().toString(),
    parent_id: parentId,
    author: {
      name: 'Current User',
      picture: 'img/ivan.png'
    },
    text,
    timestamp: Date.now(),
    children: []
  }

  flatComments.value.push(newComment)
  commentsTree.value = buildCommentTree(flatComments.value)
}
</script>