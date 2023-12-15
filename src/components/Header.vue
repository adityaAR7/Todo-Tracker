<template>
  <div class="p-3 bg-gray-100 flex border-b justify-between">
    <div class="gap-4 flex">
      <img src="/logo.png" alt="Todologo" class="h-10 rounded-full" />
      <div class="text-2xl pt-1">Task Tracker</div>
    </div>
    <button v-if="user" class="mx-4 text-lg" @click="handleLogout">
      Logout
    </button>
  </div>
</template>

<script>
export default {
  props: ["user","handleSetUser"],
  name: "Header",
  methods: {
    handleLogout(){
      window.open('http://localhost:3000/user/logout','_self')
      localStorage.clear();
      this.handleSetUser(null)

    }
  },
};
</script>
