<template>
  <div class="min-h-screen bg-primary-500 flex justify-center items-start px-4 py-4 w-[100vw]">
    <div class="w-full max-w-[798px] bg-gray-100 rounded-xl shadow-lg overflow-hidden relative">
      <!-- Header with dynamic date -->
      <div class="text-neutral-900 text-center text-sm py-4">
        {{ formattedDate }}
      </div>
      
      <!-- Messages List -->
      <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto pb-20 mr-4">
        <CommentList 
          :comments="commentsTree" 
          @add-comment="handleAddComment" 
        />
      </div>
      
      <!-- Input Area -->
      <div class="p-4 absolute w-full bottom-0 z-20">
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
  return moment().format('dddd, DD.MM.YYYY')
})


function handleAddComment(payload: { text: string | { text: string }; parentId: string | null }) {
  const text = typeof payload.text === 'string' ? payload.text : payload.text.text

  const newComment: Comment = {
    id: Date.now().toString(),
    parent_id: payload.parentId ?? null,
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