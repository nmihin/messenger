<template>
  <div class="min-h-screen bg-primary-500 flex justify-center items-center px-4 py-4">
    <div class="w-full max-w-[798px] bg-gray-100 rounded-xl shadow-lg overflow-hidden flex flex-col" style="height: 90vh;">
      <div class="text-neutral-900 text-center text-sm py-8 flex-shrink-0">
        {{ formattedDate }}
      </div>
      <div class="px-6 flex-grow overflow-y-auto mr-4">
        <CommentList 
          :comments="commentsTree" 
          @add-comment="handleAddComment" 
          class="space-y-4 pb-4"
        />
      </div>
      <div class="p-4 flex-shrink-0 bg-transparent">
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