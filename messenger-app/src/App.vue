<template>
  <div class="min-h-screen bg-blue-500 p-4">
    <div class="max-w-2xl mx-auto bg-gray-100 rounded-xl shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-blue-600 text-white p-4">
        <h1 class="text-xl font-bold">Messenger</h1>
      </div>
      
      <!-- Messages List -->
      <div class="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
        <CommentList 
          :comments="commentsTree" 
          @add-comment="handleAddComment" 
        />
      </div>
      
      <!-- Input Area -->
      <div class="border-t border-gray-200 p-4 bg-white">
        <CommentInput @submit="handleAddComment" />
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import rawData from './data/example.json'
  import CommentList from './components/CommentList.vue'
  import CommentInput from './components/CommentInput.vue'
  import { buildCommentTree, Comment } from './utils/commentTree'
  
  const flatComments = ref<Comment[]>(rawData.data.comments)
  const commentsTree = ref<Comment[]>(buildCommentTree(flatComments.value))
  
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
  