<template>
  <div class="flex justify-center my-20">
    <div class="flex flex-col bg-gray-100 border rounded-lg gap-6 w-[35%] p-4">
      <div class="flex flex-col">
        <div class="text-2xl mb-2 text-gray-600">My Task</div>
        <hr />
        <div class="flex my-3">
          <div v-if="isVisible" class="flex w-full gap-4 justify-center">
            <button class="text-blue-500 text-3xl" @click="handleShow">
              +
            </button>
            <div class="text-xl mt-2 text-gray-600">Add a task</div>
          </div>

          <div v-else class="w-full">
            <p v-if="isError" class="text-sm text-center text-red-400">
              Todo Already Present!!
            </p>
            <div class="flex w-full justify-between">
              <input
                type="text"
                class="w-full mx-2 p-1 outline-none focus:border focus:border-blue-400 rounded-lg"
                v-model="todoInput"
              />

              <div class="flex">
                <button @click="handleSubmit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-check text-blue-400"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
                    />
                  </svg>
                </button>
                <button @click="handleShow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-x text-red-400"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Todolist
          v-for="(todo, index) in todos"
          :title="todo.title"
          :id="todo._id"
          :handleComplete="handleComplete"
          :key="index"
        />
      </div>
      <div class="flex flex-col">
        <div class="text-2xl mb-2 text-gray-600">
          Completed ({{ this.completed.length }})
        </div>
        <hr class="mb-2" />
        <div v-for="todo in completed">
          <div class="flex gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-check text-blue-400"
              viewBox="0 0 16 16"
            >
              <path
                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
              />
            </svg>
            <div class="text-lg line-through">{{ todo.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Todolist from "@/components/Todolist.vue";
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  name: "todo",
  props: [
    "user",
    "handleSetUser",
    "todos",
    "handleSetTodos",
    "handleUpdateTodos",
  ],
  components: { Todolist },
  data() {
    return {
      isVisible: true,
      todoInput: "",
      completed: [],
      isError: false,
    };
  },
  methods: {
    handleShow() {
      this.isVisible = !this.isVisible;
    },
    async handleComplete(id) {
      await axios.put(`http://localhost:3000/todo/updateTodo/${id}`);
      const result = this.todos.filter((todo) => {
        return todo._id !== id;
      });
      const completedTodo = this.todos.filter((todo) => {
        return todo._id === id;
      });
      this.completed = [...this.completed, ...completedTodo];
      this.handleUpdateTodos(result);
    },
    async handleSubmit() {
      try {
        const response = await axios.post(
          `http://localhost:3000/todo/addTodo/${this.user._id}`,
          { title: this.todoInput }
        );
        const todo = response.data.result;
        this.handleSetTodos(todo);
        this.isVisible = !this.isVisible;
        this.todoInput = "";
      } catch (error) {
        this.isError = true;
        console.log(error);
      }
    },
  },
  async mounted() {
    try {
      const response = await axios.get(
        "http://localhost:3000/auth/login/success"
      );
      const result = response.data.user;
      localStorage.setItem(
        "access_token",
        JSON.stringify(result["access_token"])
      );
      const response1 = await axios.get(
        `http://localhost:3000/todo/fetchAll/${result._id}`
      );
      let result1 = response1.data.result;
      this.completed = result1.filter((todo) => {
        return todo.status === "completed";
      });
      result1 = result1.filter((todo) => {
        return todo.status !== "completed";
      });

      this.handleSetUser(result);
      this.handleSetTodos(result1);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
