<template lang="">
  <div class="flex gap-4">
    <div class="w-3 h-3 border-2 border-gray-500 rounded-full mt-2" @click="handleComplete(id)"></div>
    <div class="text-lg">{{ title }}</div>
  </div>
</template>
<script>
  export default{
    props:['title','id','handleComplete'],
  }
</script>
