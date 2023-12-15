<script setup>
import { RouterLink } from "vue-router";
</script>

<template lang="">
  <div class="flex flex-col items-center my-20">
    <div class="flex flex-col w-1/4 p-4 bg-gray-200 rounded-lg shadow-lg">
      <h1 class="text-2xl text-center mb-5">Todo Tracker</h1>
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        class="w-full p-2 outline-none focus:border focus:border-blue-400 rounded-lg mb-5"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Enter your password"
        class="w-full p-2 outline-none focus:border focus:border-blue-400 rounded-lg mb-5"
      />
      <button
        class="text-center bg-blue-400 p-2 text-lg rounded-lg text-white font-bold"
        @click="handleLogin"
      >
        Login
      </button>
      <p class="text-center mt-1">
        Create an account
        <RouterLink to="/signin" class="text-blue-400 underline font-bold"
          >Sign in</RouterLink
        >
      </p>

      <hr class="bg-gray-400 h-[0.1rem] my-5" />
      <button
        class="text-center bg-red-400 p-2 rounded-lg text-white font-bold"
        @click="handleGoogleAuth"
      >
        <div class="flex justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-google mt-1"
            viewBox="0 0 16 16"
          >
            <path
              d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
            />
          </svg>
          <div class="text-lg">Sign In With Google</div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true
export default {
  props: ["user", "handleSetUser"],
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post("https://todo-tracker-backend-production.up.railway.app/user/login", {
          email: this.email,
          password: this.password,
        });
        const result = response.data.user;
        localStorage.setItem(
          "access_token",
          JSON.stringify(result["access_token"])
        );
        this.handleSetUser(result);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async handleGoogleAuth() {
      try {
        window.open("https://todo-tracker-backend-production.up.railway.app/auth/google", "_self");
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    try {
      const response = await axios.get(
        "https://todo-tracker-backend-production.up.railway.app/auth/login/success"
      );
      const result = response.data.user;
      localStorage.setItem(
        "access_token",
        JSON.stringify(result["access_token"])
      );
      this.handleSetUser(result);
      this.$router.push("/");
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
