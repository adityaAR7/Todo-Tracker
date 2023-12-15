<script setup>
import {RouterView } from "vue-router";
</script>

<template>
  <Header :user="user" :handleSetUser="handleSetUser"/>
  <RouterView :user="user" :handleSetUser="handleSetUser" :todos="todos" :handleSetTodos="handleSetTodos" :handleUpdateTodos="handleUpdateTodos"/>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: { Header },
  data() {
    return {
      user:null,
      todos:[]
    }
  },
  methods: {
    handleSetUser(user){
      this.user = user
    },
    handleSetTodos(todos){
      this.todos = [...todos,...this.todos]
    },
    handleUpdateTodos(todos){
      this.todos = todos
    }
  },
};
</script>
